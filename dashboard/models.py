from django.db import models

# All the models connected to the filters
class Agency(models.Model):
    name = models.CharField(max_length=200)
    acronym = models.CharField(max_length=20, unique=True)

    class Meta:
        ordering = ["acronym"]

    def __str__(self):
        return self.acronym

class Theme(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name
    
class Region(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
class SDG(models.Model):
    number = models.PositiveSmallIntegerField(unique=True)
    title = models.CharField(max_length=200)

    def __str__(self):
        return f"SDG {self.number}"
    
class Outcome(models.Model):
    code = models.CharField(max_length=20)
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title
    
class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
class Keyword(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name
    
class FileType(models.TextChoices):
    PDF = "PDF", "PDF"
    WORD = "DOCX", "Word"
    EXCEL = "XLSX", "Excel"
    IMAGE = "IMAGE", "Image"
    VIDEO = "VIDEO", "Video"
    MAP = "MAP", "Map"
    PRESENTATION = "PPT", "Presentation"
    OTHER = "OTHER", "Other"

file_type = models.CharField(
    max_length=20,
    choices=FileType.choices,
    default=FileType.PDF
)

    
# The mother model
class KnowledgeItem(models.Model):
    title = models.CharField(max_length=300)
    description = models.TextField()
    agency = models.ForeignKey(Agency,on_delete=models.PROTECT,related_name="knowledge_items")
    theme = models.ForeignKey(Theme,on_delete=models.PROTECT)
    category = models.ForeignKey(Category,on_delete=models.PROTECT)
    region = models.ForeignKey(Region,on_delete=models.PROTECT)
    outcome = models.ForeignKey(Outcome,on_delete=models.PROTECT)
    sdgs = models.ManyToManyField(SDG,blank=True)
    keywords = models.ManyToManyField(Keyword,blank=True)
    year = models.PositiveIntegerField()
    uploaded_file = models.FileField(upload_to="knowledge_repository/")
    content_text = models.TextField(blank=True)
    # created_by = models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    
class KnowledgeVersion(models.Model):
    knowledge_item = models.ForeignKey(
        KnowledgeItem,
        on_delete=models.CASCADE,
        related_name="versions"
    )

    version = models.CharField(max_length=20)

    uploaded_file = models.FileField(
        upload_to="knowledge_versions/"
    )

    uploaded_at = models.DateTimeField(auto_now_add=True)