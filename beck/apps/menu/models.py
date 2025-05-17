from django.db import models
from django_resized import ResizedImageField

from utils.models import DataTimeCUAbstract


class Dish(DataTimeCUAbstract):
    image = ResizedImageField(
        ("Изображения"),
        upload_to="dish/",
        force_format="WEBP",
        quality=90,
        null=True,
        blank=True,
    )
    name = models.CharField(
        "Названия",
        max_length=35,
    )
    prise = models.DecimalField(
        "Цена",
        max_digits=10,
        decimal_places=2,
    )
    category = models.ForeignKey(
        "Category",
        models.CASCADE,
        related_name="dishes",
        verbose_name="Категория",
    )
    descriptions = models.TextField(
        "Описания",
        null=True,
        blank=True,
    )

    class Meta:
        verbose_name = "Блюда"
        verbose_name_plural = "Блюдо"

    def __str__(self):
        return f"{self.name}"


class Category(models.Model):
    name = models.CharField(
        "Названия",
        max_length=35,
    )

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"

    def __str__(self):
        return f"{self.name}"
