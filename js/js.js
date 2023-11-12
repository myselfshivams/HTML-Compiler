var [iframe, main, dubbing] = [
  document.createElement("iframe"),
  document.createElement("main"),
  document.createElement("div")
];
iframe.setAttribute('style', 'display:block;');
main.classList = 'output same';
dubbing.classList = "ss";
main.append(iframe, dubbing);
ss('.Input').after(main);

function flow_load(theme) {
  var editor = ace.edit("editor");
  editor.setTheme(theme);
  editor.session.setMode("ace/mode/html");
}

var editor = ace.edit("editor");
editor.setTheme("ace/theme/chrome");
editor.session.setMode("ace/mode/html");
var koli = editor;

koli.setOptions({
  cursorStyle: "smooth",
  behavioursEnabled: true,
  highlightGutterLine: true,
  animatedScroll: true,
  fontSize: "16px",
  foldStyle: "markbegin",
  showPrintMargin: 0,
  enableLiveAutocompletion: true,
  enableBasicAutocompletion: true,
});

koli.commands.addCommand({
  name: "input_full",
  bindKey: {
    win: 'Ctrl-i',
    mac: 'Command-i'
  },
  exec: function (editor) {
    var action = ss('.output'),
      ed = ss('#editor');
    if (action.style.display == 'none') {
      action.style.display = 'block';
      if (action.style.width.length > 0) {
        ed.style.right = action.style.width;
      } else {
        ed.style.right = "20%";
      }
      flow_load(koli.getTheme());
    } else {
      action.style.display = 'none';
      ed.style.right = "0";
      flow_load(koli.getTheme());
    }
  },
  readOnly: true
});

koli.setValue(`<!DOCTYPE html>\n<html>\n<head>\n<meta charset="utf-8">\n <meta name="viewport" content="width=device-width">\n <title>smaple</title></head>
    <body>\n\n\n\n  </body>\n</html>`);

var sesssin = window.sessionStorage.getItem('backup');
if (sesssin == null) {
  iframe.srcdoc = koli.getValue();
} else {
  koli.setValue(sesssin);
  iframe.srcdoc = sesssin;
}

koli.clearSelection();
koli.on('change', function () {
  window.sessionStorage.setItem('backup', koli.getValue());
  iframe.srcdoc = koli.getValue();
});

var typingSound = new Howl({
  src: ['path/to/typing-sound.mp3'], 
  volume: 0.5, 
});


koli.on('change', function () {
 
  typingSound.play();


  window.sessionStorage.setItem('backup', koli.getValue());
  iframe.srcdoc = koli.getValue();
});

interact('.output').resizable({

  edges: {
    left: true,
    right: false,
    bottom: false,
    top: false
  },
  onstart: function (event) {
    ss('.ss').style.display = 'block'
  },
  onend: function (event) {
    ss('.ss').style.display = 'none'
  },
  listeners: {
    move(event) {
      var target = event.target
      var x = (parseFloat(target.getAttribute('data-x')) || 0)
      var y = (parseFloat(target.getAttribute('data-y')) || 0)

      ss('#editor').style.right = event.rect.width + "px";

      target.style.width = event.rect.width + "px";
      flow_load(koli.getTheme());

      x += event.deltaRect.left;

      target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

      target.setAttribute('data-x', x)
      target.setAttribute('data-y', y)

    }
  },
  modifiers: [

    interact.modifiers.restrictEdges({
      outer: 'parent'
    }),

    interact.modifiers.restrictSize({
      min: {
        width: 70
      },
      max: {
        width: 1300
      }
    })
  ],

  inertia: true
});

function ss(a) {
  return document.querySelector(a)
}

function all(x) {
  return document.querySelectorAll(x)
}
