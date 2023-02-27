from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.http import HttpResponse
from EmployeeApp.models import Departments,Employees
from EmployeeApp.serializers import DepartmentSerializer,EmployeeSerializer

from django.core.files.storage import default_storage

# Create your views here.

@csrf_exempt
def deparmentApi(request,id=0):
    if request.method == 'GET':
        deparments = Departments.objects.all()
        deparments_serializers = DepartmentSerializer(deparments, many=True)
        return JsonResponse(deparments_serializers.data, safe=False)
    elif request.method == 'POST':
        deparment_data = JSONParser().parse(request)
        deparments_serializers = DepartmentSerializer(data=deparment_data)
        if deparments_serializers.is_valid():
            deparments_serializers.save()
            return JsonResponse(deparments_serializers.data, status = 201)
        return JsonResponse(deparments_serializers.error_messages, status = 400)

    elif request.method == 'PUT':
        deparment_data = JSONParser().parse(request)
        department = Departments.objects.get(DepartmentId = deparment_data['DepartmentId'])
        deparments_serializers = DepartmentSerializer(department, data=deparment_data)
        if deparments_serializers.is_valid():
            deparments_serializers.save()
            return JsonResponse(deparments_serializers.data, status = 200)
        return JsonResponse(deparments_serializers.error_messages, status = 400)
    
    elif request.method == 'DELETE':
        department = Departments.objects.get(DepartmentId = id)
        department.delete()
        return JsonResponse('Deleted Successfully!', safe=False)
    return JsonResponse('Failed To delete', safe =False)

@csrf_exempt
def employeeApi(request,id=0):
    if request.method == 'GET':
        employees = Employees.objects.all()
        employees_serializers = EmployeeSerializer(employees, many=True)
        return JsonResponse(employees_serializers.data, safe=False)

    elif request.method == 'POST':
        employee_data = JSONParser().parse(request)
        employees_serializers = EmployeeSerializer(data=employee_data)
        if employees_serializers.is_valid():
            employees_serializers.save()
            return JsonResponse("Added Succesfully" + employees_serializers.data, status = 200)
        return JsonResponse(employees_serializers.error_messages, status = 400)

    elif request.method == 'PUT':
        employee_data = JSONParser().parse(request)
        employee = Employees.objects.get(EmployeeId = employee_data['EmployeeId'])
        employees_serializers = EmployeeSerializer(employee, data=employee_data)
        if employees_serializers.is_valid():
            employees_serializers.save()
            return JsonResponse(employees_serializers.data, status = 200)
        return JsonResponse(employees_serializers.error_messages, status = 400)
    
    elif request.method == 'DELETE':
        employee = Employees.objects.get(EmployeeId = id)
        employee.delete()
        return JsonResponse('Deleted Successfully!', safe=False)
    return JsonResponse('Failed To delete', safe =False)

@csrf_exempt
def SaveFile(request):
    file = request.FILES['uploadedFile']
    file_name = default_storage.save(file.name, file)

    return JsonResponse(file_name, safe=False)


