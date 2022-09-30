from random import choices
from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.shortcuts import redirect
from . import models
import json
import os

def constructContext(request, code):

    f = open(os.path.join('app','plot.json'))
    data = json.load(f)

    firstName = request.COOKIES.get('firstName')
    lastName = request.COOKIES.get('lastName')
    gender = request.COOKIES.get('gender')
    if firstName is None:
        firstName = "Ronald"
    if lastName is None:
        lastName = "Reagan"
    if gender is None:
        gender = "male"
    title = "Mr." if gender == "male" else "Ms."
    pos = " his" if gender == "male" else " her"

    print(gender)
    
    for i in range(len(data[code]["text"])):
        data[code]["text"][i] = data[code]["text"][i].replace("Seth", firstName)
        data[code]["text"][i] = data[code]["text"][i].replace("Lupo", lastName)
        data[code]["text"][i] = data[code]["text"][i].replace("Mr.", title)
        data[code]["text"][i] = data[code]["text"][i].replace(" his", pos)
        
    print(data[code])

    context = {
       "title": data[code]["title"],
       "text": data[code]["text"],
       "code": code
    }

    if "choices" in data[code]:
        for i in range(len(data[code]["choices"])):
    
            counter = models.Counter.objects.get(code=code, index=i)
            data[code]["choices"][i]["freq"] = counter.count
            
            context["choices"] = data[code]["choices"]


    else:
        
        context["good"] = str(data[code]["good"]).lower()
        context["img"] = data[code]["image"]

        counter = models.Counter.objects.get(code=code, index=0)
        counter.count += 1
        context["freq"] = counter.count
        counter.save()

        if (data[code]["good"]):
            goodCounter = models.Counter.objects.get(code="GOOD", index=0)
            goodCounter.count += 1
            context["typeFreq"] = goodCounter.count
            goodCounter.save()
        else:
            badCounter = models.Counter.objects.get(code="BAD", index=0)
            badCounter.count += 1
            context["typeFreq"] = badCounter.count
            badCounter.save()

        totalCounter = models.Counter.objects.get(code="TOTAL", index=0)
        totalCounter.count += 1
        context["totalFreq"] = totalCounter.count
        totalCounter.save()

    return context

def updateCounter(request):
    data = request.POST.dict()
    counter = models.Counter.objects.get(code=data["code"], index=data["index"])
    counter.count += 1
    counter.save()
    return HttpResponse("Hi Five")

def requirementsPage(request):
    template =  loader.get_template("requirements.html")
    context = {}
    return HttpResponse(template.render(context, request))

def redirectToStartPage(request):
    response = redirect('/start')
    return response

def startPage(request,):
    template =  loader.get_template("start.html")
    return HttpResponse(template.render({}, request))

def storyPage(request, code):
    template =  loader.get_template("story.html")
    return HttpResponse(template.render(constructContext(request, code), request))

def endingPage(request, code):
    template =  loader.get_template("ending.html")
    return HttpResponse(template.render(constructContext(request, code), request))

