from django.contrib import admin
from django.contrib.admin import ModelAdmin, TabularInline

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
    )

    list_display_links = (
        "id",
        "table",
        "status",
        "total_prise",
    )

    search_fields = ("id",)

    list_filter = (
        "status",
        "table",
    )
    inlines = [OrderItemsInline]
