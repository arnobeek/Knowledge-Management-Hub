from django.contrib import admin
from .models import Agency, Theme, Region, SDG, Outcome, Category, Keyword, KnowledgeItem, KnowledgeFile, KnowledgeVersion

admin.site.register(Agency)
admin.site.register(Theme)
admin.site.register(Region)
admin.site.register(SDG)
admin.site.register(Outcome)
admin.site.register(Category)
admin.site.register(Keyword)
admin.site.register(KnowledgeItem)
admin.site.register(KnowledgeFile)
admin.site.register(KnowledgeVersion)

