import os
import json
import app.models
print("G")

def populate():

    app.models.Counter.objects.all().delete()


    f = open(os.path.join('app','plot.json'))
    data = json.load(f)

    for code in data.keys():
        event = data[code]
        if "choices" in event.keys():
            for i in range(len(event["choices"])):
                counter = app.models.Counter(code=code, index=i)
                counter.save()
        else:
            counter = app.models.Counter(code=code, index=0)
            counter.save()

    counter = app.models.Counter(code="TOTAL", index=0)
    counter.save()

    counter = app.models.Counter(code="GOOD", index=0)
    counter.save()

    counter = app.models.Counter(code="BAD", index=0)
    counter.save()
