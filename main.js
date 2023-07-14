let text = document.getElementById('text')
let data = document.getElementById('data')
let lines = [
  ['\n local DATA = ["Key":123991,"ID":178728381]'],
  ['\n print("initiate plant")'],
  ['\n While True do','\n\u00A0 require(workspace.Data)','\n\u00A0 --//  Access key data','\n end'],
  ['\n if (FACTOR_LOCATED) then','\n\u00A0 for i = 1,FACTORS do','\n\u00A0\u00A0 FACTOR.Value = i','\n\u00A0 end','\n end'],
  ['\n function requests(delta)','\n\u00A0 task.wait(delta)','\n\u00A0 local FC = request(FACTORIALS)','\n\u00A0 for i,v in ipairs(FC)do','\n\u00A0\u00A0 if v:IsA("Frame") then','\n\u00A0\u00A0\u00A0 return v','\n\u00A0\u00A0 end','\n\u00A0 end','\n end'],
  ['\n --// DATA MUST BE RETURNED'],
  ['\n game:GetService("RunService").RenderStepped:connect(function(dt)','\n\u00A0 requests(dt)','\n end)'],
  ['\n game:GetService("DataStoreService"):GetDataStoreAsync("MAIN")'],
  ['\n print(DATA)']
]
let current = []
let index = 0
let lps = 0
let maxLps = parseInt(localStorage.getItem('MAXLPS')) | 0
let lastIndex = -1

setFooter()

function setFooter() {
  data.textContent = "Lines per second: "+lps+"\u00A0 Highest: "+maxLps;
}
function chooseLine(){
  if (index == current.length){
    let num = lastIndex
    do{
      num = Math.floor(Math.random()*lines.length);
    }while (num == lastIndex)
    current = lines[num]
    index = 0
    lastIndex = num
  }
  text.textContent += current[index];
  index +=1;
  lps+=1;
  if (lps>maxLps){
    maxLps = lps;
    localStorage.setItem('MAXLPS',maxLps);
  }
  setTimeout(function () {
    lps-=1;
    setFooter()
  }, 1000);
  setFooter()
}

document.addEventListener('keydown', function(event) {
  chooseLine();
  window.scrollTo(0, document.body.scrollHeight);
});
