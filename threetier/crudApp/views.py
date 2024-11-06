from django.shortcuts import render
from django.http import JsonResponse
# Create your views here.
from django.shortcuts import render, redirect  
from .forms import EmployeeForm  
from .models import Employee  

from django.views.decorators.csrf import csrf_exempt
# Create your views here.  


def check(request):  
    if request.method == "GET":  
        data = {"response":"hello"}
    return JsonResponse(data, status=200)

@csrf_exempt
def emp(request):  
    if request.method == "POST":  
        form = EmployeeForm(request.POST)  
        if form.is_valid():  
            try:  
                form.save()  
                return JsonResponse({'status':"emp uploaded successfully"}, status=200)
            except:  
                pass  
    else:  
        form = EmployeeForm()
    return JsonResponse({'form':form}, status=200)



@csrf_exempt
def show(request): 
    if request.method == "POST":   
        employees = Employee.objects.all().values()
        employee_list = list(employees)  # Convert the QuerySet to a list
        return JsonResponse({'employees': employee_list}, status=200)

@csrf_exempt
def destroy(request, id):  
    try:
        employee = Employee.objects.get(eid=id)  
        employee.delete()  
        return  JsonResponse( {'status': 'emp detail deleted'}, status=200)
    except Exception as e:
        return  JsonResponse( {'error': str(e)})