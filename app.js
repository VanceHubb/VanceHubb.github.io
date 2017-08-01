const data = [{
    title: 'Warm up',
    body: `It's a live editor. Try to play around with the code!`,
    code: `<div>Hello world!</div>
<script>
  $('body').append('<div>Live editor!</div>')
</script>`},
  {
    title: 'Hello world!',
    body: 'This is an example',
    code: '<div> hello world! </div>'
  }
];

$(document).ready(() => {
  data.map((entry, index) => {
    $('#coding').append(`<section><div class="left"><div class="title">${entry.title}</div><div class="body">${entry.body}</div><div class="editor" id="code${index}"/></div><div class="right"><iframe id="iframe${index}" src="/iframe.html"/></div></section>`);
    $('#code' + index).text(entry.code);

    let editor = ace.edit('code' + index);
    editor.setOptions({fontFamily: 'Inconsolata', fontSize: '16px'})
    editor.getSession().setMode('ace/mode/html');
    editor.getSession().setTabSize(2);
    let updateFunc = debounce((e) => {
      $('#iframe' + index).contents().find("body").html(editor.getValue());
    }, 1000);
    updateFunc();
    editor.getSession().on('change', updateFunc);
  });
});

function debounce(callback, wait, context = this) {
  let timeout = null
  let callbackArgs = null

  const later = () => callback.apply(context, callbackArgs)

  return function () {
    callbackArgs = arguments
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}