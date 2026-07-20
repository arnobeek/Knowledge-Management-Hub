from django.db import models
from django.conf import settings


# Lookup Models

class Agency(models.Model):
    name = models.CharField(max_length=200)
    acronym = models.CharField(max_length=20, unique=True)

    class Meta:
        ordering = ["acronym"]

    def __str__(self):
        return self.acronym


class Theme(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class Region(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class SDG(models.Model):
    number = models.PositiveSmallIntegerField(unique=True)
    title = models.CharField(max_length=200)

    class Meta:
        ordering = ["number"]

    def __str__(self):
        return f"SDG {self.number}"


class Outcome(models.TextChoices):
    OUTCOME_1 = "Outcome 1", "Outcome 1: Sustainable Growth"
    OUTCOME_2 = "Outcome 2", "Outcome 2: Human Capital"
    OUTCOME_3 = "Outcome 3", "Outcome 3: Resilience"

    class Meta:
        ordering = ["code"]

    def __str__(self):
        return self.title


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class Keyword(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name

# Choice Lists

class KnowledgeType(models.TextChoices):
    EVIDENCE = "Evidence", "Evidence"
    INSIGHTS = "Insights", "Insights"
    EXPERIENCE = "Experience", "Experience"
    RESOURCES = "Resources", "Resources"


class Status(models.TextChoices):
    DRAFT = "Draft", "Draft"
    PUBLISHED = "Published", "Published"
    ARCHIVED = "Archived", "Archived"
    ACTIVE = "Active", "Active"


class FileType(models.TextChoices):
    PDF = "PDF", "PDF"
    DOCX = "DOCX", "Word Document"
    XLSX = "XLSX", "Excel Spreadsheet"
    PPTX = "PPTX", "PowerPoint"
    IMAGE = "IMAGE", "Image"
    VIDEO = "VIDEO", "Video"
    MAP = "MAP", "Map"
    OTHER = "OTHER", "Other"


# Upload Path

def knowledge_file_upload_path(instance, filename):
    year = instance.knowledge_item.year
    category = instance.knowledge_item.category.name.replace(" ", "_")

    return f"knowledge_repository/{year}/{category}/{filename}"


# Main Repository Mother model

class KnowledgeItem(models.Model):
    title = models.CharField(max_length=300)
    description = models.TextField()
    agency = models.ForeignKey(Agency,on_delete=models.PROTECT,related_name="knowledge_items")
    theme = models.ForeignKey(Theme,on_delete=models.PROTECT)
    category = models.ForeignKey(Category,on_delete=models.PROTECT)
    region = models.ForeignKey(Region,on_delete=models.PROTECT )
    outcome = models.CharField(max_length=20, choices=Outcome.choices)
    sdgs = models.ManyToManyField(SDG,blank=True)
    keywords = models.ManyToManyField(Keyword,blank=True)
    year = models.PositiveIntegerField()
    knowledge_type = models.CharField(max_length=20,choices=KnowledgeType.choices,default=KnowledgeType.EVIDENCE)
    status = models.CharField(max_length=20,choices=Status.choices,default=Status.DRAFT)
    content_text = models.TextField(blank=True,help_text="Extracted text from uploaded files.")
    uploaded_by = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.SET_NULL,null=True,blank=True)
    is_indexed = models.BooleanField(default=False)
    embedding_id = models.CharField(max_length=100,blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title


# Multiple Files Per Knowledge Item

class KnowledgeFile(models.Model):
    knowledge_item = models.ForeignKey(KnowledgeItem,on_delete=models.CASCADE,related_name="files")
    file = models.FileField(upload_to=knowledge_file_upload_path)
    file_type = models.CharField(max_length=20,choices=FileType.choices,default=FileType.PDF)
    extracted_text = models.TextField(blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file.name


# Version History

class KnowledgeVersion(models.Model):
    knowledge_item = models.ForeignKey(KnowledgeItem,on_delete=models.CASCADE,related_name="versions")
    version = models.CharField(max_length=20)
    uploaded_file = models.FileField(upload_to="knowledge_versions/")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.knowledge_item.title} ({self.version})"