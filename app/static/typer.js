let audio = true

// American Numbering System
var th = ['','thousand','million', 'billion','trillion'];
// uncomment this line for English Number System
// var th = ['','thousand','million', 'milliard','billion'];

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

var sam = new SamJs({
    speed: 60,
    pitch: 70,
    throat: 100,
    mouth: 105,
})

class ReadableDiv {

    constructor(id, text, finalId) {
        this.revealed = false
        this.text = text
        this.id = id
        this.finalId = finalId
        this.audioPromise = 0
        
    }
    
    read() {
       
        if (this.revealed) return
        this.revealed = true
        this.readSection(0)
    }

    readSection(textIndex) {
        

        let currentPara = $("<p class='revealableText'></p>")
        $("#"+this.id).append(currentPara)

        var reg = /(?<=(?<!(rr|Mr|Ms|Mx|etc))[\.\!\?]) /
        let sentences = this.text[textIndex].split(reg)
        sentences = sentences.filter(s => s!=undefined)
        sentences = sentences.filter(s => s.replace(/\s/g, '').length)
        sentences = sentences.map(s => s+" ")

        console.log(sentences)
        
        let typeSettings = {
            e: 0.001, 
            t: 5,
        }
        
        let readSentence = (sentenceIndex)=>{
            console.log(sentences[sentenceIndex], sentenceIndex, )
            currentPara.typetype(sentences[sentenceIndex], typeSettings)
            

            let spokenString = sentences[sentenceIndex]
            if (audio) this.audioPromise = sam.speak(spokenString)
            else return
            this.audioPromise.then(()=>{
                setTimeout(()=>{
                    if (sentenceIndex == sentences.length-1) {
                        currentPara.addClass("revealedText")
                        setTimeout(()=>{
                            if (textIndex == this.text.length-1) {
                                if (this.finalId!=null) $("#"+this.finalId).fadeIn(3000)
                            } else this.readSection(textIndex+1)
                        }, 500)
                    } else {
                        readSentence(sentenceIndex+1)
                    }
                }, 500)
            })
        }

        window.onkeydown= (e)=>{
            
            if (e.keyCode != 32) return
            if (!audio) return
            
            console.log("GERERER")
            audio = false
            console.log(this.audioPromise)
            this.audioPromise.abort()

            $("#"+this.id).html("")
            for (let para of this.text) {
                let paraElement = $("<p class='revealableText revealedText'></p>")
                paraElement.html(para)                    
                $("#"+this.id)
                .append(paraElement)
            }
                
            if (this.finalId!=null) $("#"+this.finalId).show()  
        

            return

            
            
                
        }

        readSentence(0)

    }

}
