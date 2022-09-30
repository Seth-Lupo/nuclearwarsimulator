let text = ["The world is on the brink of destruction. Only you, the president of the United States of America, can lead us through these frightful times. Will you lead our nation back to safety or will your choices kill millions? No matter what, you must answer the call to duty.", "I am your humble Robo-Assistance, the CIIA-1982. Known as the Classified Intelligence Informer Machine, I was developed with a joint partnership between the CIA and MIT to create an organized, intelligient, and secure repository of classified information. I'll not only report on the events, but give your options for your next course of action.", "If you are getting board of me talking, you are welcome to skip my diologue by pressing the space bar. Also, enter your name and gender so I can get to know you better.", "Good luck to you. Good luck to all of us."]

let content = new ReadableDiv("revealableTextDiv", text, "startForm")

$(".readStartButton").click(()=>{
    content.read()
})

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

$("#firstNameInput").val(getCookie("firstName"))
$("#lastNameInput").val(getCookie("lastName"))
$('input[value='+getCookie("gender")+']').prop("checked", "true")

$("#startFormButton").click(()=>{
    let firstName  = $("#firstNameInput").val()
    let lastName  = $("#lastNameInput").val()
    let gender = $('input[name=gender]:checked').val()
    if (firstName == "" || lastName == "" || gender == undefined) {
        $("#warningHeader").fadeIn(300)
    }
    else {
        console.log(firstName, lastName, gender)
        setCookie("firstName", firstName, 60)
        setCookie("lastName", lastName, 60)
        setCookie("gender", gender, 60)
        window.location.href =  window.location.protocol + "//" + window.location.host + "/story/a"
    }
})

$()
    
    