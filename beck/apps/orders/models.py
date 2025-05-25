from django.db import models

from utils.models import DataTimeCUAbstract


class Table(models.Model):
    number = models.PositiveIntegerField("Номер", unique=True)
    seats = models.PositiveIntegerField("Количество мест", default=4)
    is_occupied = models.BooleanField("Статс", default=False)

    class Meta:
        verbose_name = "Стол"
        verbose_name_plural = "Столы"

    def __str__(self):
        return f"Стол №{self.number}"


class Order(DataTimeCUAbstract):
    STATUS_CHOICES = [
        ("created", "Создан"),
        ("ready", "Готов"),
    ]
    user = models.ForeignKey(
        "account.User",
        models.SET_NULL,
        null=True,
        related_name="orders",
        verbose_name="User",
    )
    table = models.ForeignKey(
        Table,
        on_delete=models.SET_NULL,
        null=True,
        related_name="orders",
        verbose_name="Стол",
    )
    status = models.CharField(
        "Статус",
        max_length=10,
        choices=STATUS_CHOICES,
        default="created",
    )
    total_prise = models.DecimalField(
        "Общая цена",
        max_digits=10,
        decimal_places=2,
        default=0,
    )
    is_paid = models.BooleanField(
        "Оплачено",
        default=False,
    )

    class Meta:
        verbose_name = "Заказ"
        verbose_name_plural = "Заказы"

    def __str__(self):
        return f"Заказ №{self.pk}"


class OrderItems(models.Model):
    order = models.ForeignKey(
        Order,
        models.CASCADE,
        related_name="items",
        verbose_name="Заказ",
    )
    dish = models.ForeignKey(
        "menu.Dish",
        models.SET_NULL,
        null=True,
        related_name="orders_item",
        verbose_name="Блюло",
    )
    count = models.PositiveIntegerField(
        "Количество",
        default=1
    )
    total_prise = models.DecimalField(
        "Общая цена",
        max_digits=10,
        decimal_places=2,
        default=0,
    )

    class Meta:
        verbose_name = "Заказ"
        verbose_name_plural = "Заказы"

    def __str__(self):
        return f"{self.order.pk} order item"
