from django.contrib import admin
from django.contrib.admin import ModelAdmin, TabularInline
from django.db.models import Sum

from .models import *


class OrderItemsInline(TabularInline):
    model = OrderItems
    extra = 1


@admin.register(Table)
class TableAdmin(ModelAdmin):

    list_display = (
        "id",
        "number",
        "seats",
        "is_occupied",
    )

    list_display_links = (
        "id",
        "number",
        "seats",
        "is_occupied",
    )

    search_fields = (
        "number",
        "seats",
    )
    list_filter = ("is_occupied",)


@admin.register(Order)
class OrderAdmin(ModelAdmin):

    list_display = (
        "id",
        "table",
        "status",
        "total_prise",
        "is_paid",
        "create_dt",
        "update_dt",
    )

    list_display_links = (
        "id",
        "table",
        "status",
        "total_prise",
        # "is_paid",
    )

    search_fields = ("id",)

    list_filter = (
        "create_dt",
        "update_dt",
        "status",
        "table",
    )
    change_list_template = "admin/orders/order_changelist.html"
    inlines = [OrderItemsInline]
    list_per_page = 20 

    def changelist_view(self, request, extra_context=None):
        response = super().changelist_view(request, extra_context=extra_context)

        try:
            queryset = response.context_data["cl"].queryset
            total_paid = (
                queryset.filter(is_paid=True).aggregate(total=Sum("total_prise"))["total"]
                or 0
            )
        except (AttributeError, KeyError):
            total_paid = 0

        response.context_data["total_paid"] = total_paid
        return response

