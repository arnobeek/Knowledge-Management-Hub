from rest_framework import serializers
from .models import *

class AgencySerializer(serializers.ModelSerializer):

    class Meta:
        model = Agency
        fields = "__all__"

class ThemeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Theme
        fields = "__all__"

class RegionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Region
        fields = "__all__"

class SDGSerializer(serializers.ModelSerializer):

    class Meta:
        model = SDG
        fields = "__all__"

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = "__all__"

class KeywordSerializer(serializers.ModelSerializer):

    class Meta:
        model = Keyword
        fields = "__all__"

class KnowledgeFileSerializer(serializers.ModelSerializer):

    class Meta:
        model = KnowledgeFile
        fields = "__all__"

class KnowledgeItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = KnowledgeItem
        fields = "__all__"