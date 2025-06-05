from django.contrib import admin
from django.contrib.admin import ModelAdmin
from django.utils.safestring import mark_safe

from .models import *


@admin.register(Category)
class CategoryAdmin(ModelAdmin):

    list_display = (
        "id",
        "name",
    )

    list_display_links = ("name",)

    search_fields = ("name",)


@admin.register(Dish)
class DishAdmin(admin.ModelAdmin):
    list_display = (
        "get_image",
        "id",
        "name",
        "prise",
        "update_dt",
        "create_dt",
    )

    list_display_links = (
        "get_image",
        "id",
        "name",
        "prise",
    )

    list_filter = (
        "create_dt",
        "category",
    )

    @admin.display(description="Изображение")
    def get_image(self, instance: Dish):
        if instance.image:
            return mark_safe(f'<img src="{instance.image.url}" width="100px">')
        return "-"
