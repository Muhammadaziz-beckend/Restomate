from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Order, OrderItems


@receiver(post_save, sender=OrderItems)
def order_items_handler(sender, instance: OrderItems, created, **kwargs):
    dish_price = instance.dish.prise
    total_price = dish_price * instance.count

    if instance.total_prise != total_price:
        instance.total_prise = total_price
        instance.save()
        # обновляем цену заказа
        instance.order.save()


@receiver(post_save, sender=Order)
def order_handler(sender, instance: Order, created, **kwargs):
    order_items = instance.items.all()

    total_price = sum(item.total_prise for item in order_items)

    if instance.total_prise != total_price:
        Order.objects.filter(pk=instance.pk).update(total_prise=total_price)
