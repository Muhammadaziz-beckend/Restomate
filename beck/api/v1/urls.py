from django.urls import path, include
from rest_framework.routers import DefaultRouter

from apps.account.views import Login
from apps.orders.views import OrderModelViewSet, TableModelViewSet, UpdateOrderItem

from .ysge import swagger
from apps.menu.views import *

router = DefaultRouter()
# router.register("auth/orders", AdminOrderViewSet, basename="admin-orders") 
router.register("orders", OrderModelViewSet)
router.register("tables", TableModelViewSet)
router.register("dishes", DishModelViewsSet)
router.register("category", Category)

urlpatterns = [
    # auth
    path("auth/login", Login.as_view()),
    # orders
    path("orders/<int:order_id>/items/<int:items_id>", UpdateOrderItem.as_view()),
    #
    path("", include(router.urls)),
]

urlpatterns += swagger
