from django.db import models
from academics.models import Term
# Finance models mapped from Prisma FeeStructure and FeePayment

class FeeStructure(models.Model):
    name = models.CharField(max_length=100)
    amount = models.FloatField()
    currency = models.CharField(max_length=10, default="USD")
    term = models.ForeignKey(Term, on_delete=models.CASCADE, related_name='fee_structures')
    due_date = models.DateField()

class FeePayment(models.Model):
    # This will need a reference to the student, we will use a string reference or late import 
    # since Student will likely be in users.models
    student_id = models.CharField(max_length=100) # Simplified for now, should FK to Student
    fee_structure = models.ForeignKey(FeeStructure, on_delete=models.SET_NULL, null=True, blank=True)
    
    amount_paid = models.FloatField()
    payment_date = models.DateField(auto_now_add=True)
    method = models.CharField(max_length=50) # CASH, CARD, ONLINE
    transaction_id = models.CharField(max_length=100, unique=True, null=True, blank=True)
    status = models.CharField(max_length=20) # PENDING, PAID, OVERDUE

    recorded_by = models.CharField(max_length=100, null=True, blank=True)
