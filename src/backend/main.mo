import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  public type ProductType = {
    #course;
    #ebook;
  };

  public type ProductId = Text;

  public type Product = {
    id : ProductId;
    name : Text;
    price : Nat;
    image : Text;
    productType : ProductType;
  };

  public type PaymentMethod = {
    #razorpay;
    #upi;
    #paytm;
    #card;
  };

  public type PaymentLinkConfig = {
    url : ?Text;
    instructions : Text;
  };

  public type OrderStatus = {
    #pending;
    #paid;
    #delivered;
    #cancelled;
  };

  public type OrderId = Text;

  public type Order = {
    id : OrderId;
    productId : ProductId;
    user : Principal;
    paymentMethod : PaymentMethod;
    status : OrderStatus;
    timestamp : Time.Time;
  };

  public type DownloadToken = {
    productId : ProductId;
    user : Principal;
    expiresAt : Time.Time;
  };

  module Product {
    public func compareByName(product1 : Product, product2 : Product) : Order.Order {
      Text.compare(product1.name, product2.name);
    };
  };

  module Key {
    public func compare(key1 : (ProductId, PaymentMethod), key2 : (ProductId, PaymentMethod)) : Order.Order {
      switch (Text.compare(key1.0, key2.0)) {
        case (#equal) { comparePaymentMethod(key1.1, key2.1) };
        case (order) { order };
      };
    };

    func comparePaymentMethod(method1 : PaymentMethod, method2 : PaymentMethod) : Order.Order {
      let toNat = func(method : PaymentMethod) : Nat {
        switch (method) {
          case (#razorpay) { 0 };
          case (#upi) { 1 };
          case (#paytm) { 2 };
          case (#card) { 3 };
        };
      };
      Nat.compare(toNat(method1), toNat(method2));
    };
  };

  // Initialize products
  let productsMap = Map.empty<ProductId, Product>();

  let initialProducts = [
    {
      id = "ai-mastery";
      name = "AI Mastery Course";
      price = 2999;
      image = "/images/ai-mastery.jpg";
      productType = #course;
    },
    {
      id = "chatgpt-earning";
      name = "ChatGPT Earning Course";
      price = 2499;
      image = "/images/chatgpt-earning.jpg";
      productType = #course;
    },
    {
      id = "freelancing-course";
      name = "Freelancing Course";
      price = 1999;
      image = "/images/freelancing-course.jpg";
      productType = #course;
    },
    {
      id = "instagram-growth";
      name = "Instagram Growth Course";
      price = 1499;
      image = "/images/instagram-growth.jpg";
      productType = #course;
    },
    {
      id = "ai-tools-ebook";
      name = "AI Tools Ebook";
      price = 499;
      image = "/images/ai-tools-ebook.jpg";
      productType = #ebook;
    },
    {
      id = "online-earning-ebook";
      name = "Online Earning Ebook";
      price = 399;
      image = "/images/online-earning-ebook.jpg";
      productType = #ebook;
    },
    {
      id = "freelancing-blueprint";
      name = "Freelancing Blueprint";
      price = 299;
      image = "/images/freelancing-blueprint.jpg";
      productType = #ebook;
    },
    {
      id = "digital-marketing-ebook";
      name = "Digital Marketing Ebook";
      price = 199;
      image = "/images/digital-marketing-ebook.jpg";
      productType = #ebook;
    },
  ];

  for (product in initialProducts.values()) {
    productsMap.add(product.id, product);
  };

  // Payment link configs
  let paymentLinks = Map.empty<(ProductId, PaymentMethod), PaymentLinkConfig>();

  // Orders and downloads storage
  let orders = Map.empty<OrderId, Order>();
  let downloadTokens = Map.empty<Text, DownloadToken>();

  // Generate unique IDs
  func generateId(prefix : Text) : Text {
    prefix # Time.now().toText();
  };

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Product queries
  public query ({ caller }) func getProductsByType(productType : ProductType) : async [Product] {
    let productsIter = productsMap.values();
    let filtered = productsIter.filter(
      func(p) {
        p.productType == productType;
      }
    );
    filtered.toArray().sort(Product.compareByName);
  };

  public query ({ caller }) func getProduct(productId : ProductId) : async Product {
    switch (productsMap.get(productId)) {
      case (?product) { product };
      case (null) { Runtime.trap("Product not found") };
    };
  };

  // Payment links
  public query ({ caller }) func getPaymentLink(
    productId : ProductId,
    paymentMethod : PaymentMethod
  ) : async PaymentLinkConfig {
    switch (paymentLinks.get((productId, paymentMethod))) {
      case (?config) { config };
      case (null) {
        Runtime.trap("Payment method not supported for this product");
      };
    };
  };

  public shared ({ caller }) func setPaymentLink(
    productId : ProductId,
    paymentMethod : PaymentMethod,
    config : PaymentLinkConfig,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can set payment links");
    };

    // Validate product existence
    ignore getProduct(productId);
    paymentLinks.add((productId, paymentMethod), config);
  };

  // Order management
  public shared ({ caller }) func createOrder(
    productId : ProductId,
    paymentMethod : PaymentMethod,
  ) : async OrderId {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create orders");
    };

    // Validate product existence
    ignore getProduct(productId);

    let orderId = generateId("order");
    let order : Order = {
      id = orderId;
      productId;
      user = caller;
      paymentMethod;
      status = #pending;
      timestamp = Time.now();
    };

    orders.add(orderId, order);
    orderId;
  };

  public shared ({ caller }) func markOrderAsPaid(orderId : OrderId) : async () {
    let order = switch (orders.get(orderId)) {
      case (?o) { o };
      case (null) {
        Runtime.trap("Order not found");
      };
    };

    if (order.user != caller and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only order owner or admin can mark as paid");
    };

    let updatedOrder = {
      id = order.id;
      productId = order.productId;
      user = order.user;
      paymentMethod = order.paymentMethod;
      status = #paid;
      timestamp = order.timestamp;
    };

    orders.add(orderId, updatedOrder);

    // Generate download token if ebook
    let product = getProductInternal(order.productId);

    if (product.productType == #ebook) {
      let token = generateId("token");
      let downloadToken : DownloadToken = {
        productId = order.productId;
        user = order.user;
        expiresAt = Time.now() + (24 * 60 * 60 * 1000000000); // 24 hours in nanoseconds
      };
      downloadTokens.add(token, downloadToken);
    };
  };

  // Download management
  public query ({ caller }) func getDownloadToken(orderId : OrderId) : async Text {
    let order = switch (orders.get(orderId)) {
      case (?o) { o };
      case (null) {
        Runtime.trap("Order not found");
      };
    };

    if (order.user != caller) {
      Runtime.trap("Unauthorized: Only order owner can get download token");
    };

    if (order.status != #paid) {
      Runtime.trap("Order must be paid to get download link");
    };

    let token = generateId("token");
    let downloadToken : DownloadToken = {
      productId = order.productId;
      user = caller;
      expiresAt = Time.now() + (24 * 60 * 60 * 1000000000);
    };
    downloadTokens.add(token, downloadToken);
    token;
  };

  public query ({ caller }) func validateDownloadToken(token : Text) : async ProductId {
    switch (downloadTokens.get(token)) {
      case (?tok) {
        if (caller != tok.user) {
          Runtime.trap("Unauthorized: Token does not belong to caller");
        };
        if (Time.now() > tok.expiresAt) {
          Runtime.trap("Download token expired");
        };
        tok.productId;
      };
      case (null) {
        Runtime.trap("Invalid download token");
      };
    };
  };

  // Download history
  public query ({ caller }) func getDownloads(user : ?Principal) : async [Order] {
    let principal = switch (user) {
      case (?p) {
        // If requesting another user's downloads, must be admin
        if (p != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Only admins can view other users' downloads");
        };
        p;
      };
      case (null) { caller };
    };

    let filtered = orders.values().toArray().filter(
      func(o) {
        o.user == principal and o.status == #paid and isEbook(o.productId);
      }
    );
    filtered;
  };

  func isEbook(productId : ProductId) : Bool {
    switch (productsMap.get(productId)) {
      case (?product) { product.productType == #ebook };
      case (null) { false };
    };
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    productsMap.values().toArray();
  };

  func getProductInternal(productId : ProductId) : Product {
    switch (productsMap.get(productId)) {
      case (?product) { product };
      case (null) { Runtime.trap("Product not found") };
    };
  };
};
