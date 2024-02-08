import {
  AdminDashboardObserver,
  ProductCatalog,
  UserNotificationObserver,
} from './observer';

const productCatalog = new ProductCatalog();
const adminDashboard = new AdminDashboardObserver();
const userNotifications = new UserNotificationObserver();

productCatalog.subscribe(adminDashboard);
productCatalog.subscribe(userNotifications);

productCatalog.addProduct('iPhone', 89.99);
