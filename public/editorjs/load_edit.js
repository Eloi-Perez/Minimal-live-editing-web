// let oldData;
let editor;
let currentURL = document.URL;
const urlG = `${currentURL}editor`;
fetch(urlG).then(response => {
  if (response.ok) {
    return response.json();
  }
  // throw new Error('Request failed!');
}, networkError => {
  console.log(networkError.message)
// }).then(jsonResponse => {oldData = jsonResponse}).then(
}).then(jsonResponse => {
  editor = new EditorJS({
    /**
     * Id of Element that should contain the Editor
     */
    holder: 'editorjs',

    placeholder: 'Start writing your story here',

    /**
     * Available Tools list.
     * Pass Tool's class or Settings object for each Tool you want to use
     */
    tools: {
      header: {
        class: Header, 
        inlineToolbar: true
      },
      list: {
        class: List, 
        inlineToolbar: true 
      },
      quote: {
        class: Quote,
        inlineToolbar: true,
        shortcut: 'CMD+SHIFT+O',
        config: {
          quotePlaceholder: 'Enter a quote',
          captionPlaceholder: 'Quote\'s author',
        },
      },
      warning: {
        class: Warning,
        inlineToolbar: true,
        shortcut: 'CMD+SHIFT+W',
        config: {
          titlePlaceholder: 'Title',
          messagePlaceholder: 'Message',
        },
      },
      embed: {
        class: Embed,
        inlineToolbar: false
      },
            // image: {
      //   class: ImageTool,
      //   config: {
      //     endpoints: {
      //       byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
      //       byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
      //     }
      //   }
      // },
      raw: RawTool,
      underline: Underline


    },


    /**
     * Previously saved data that should be rendered
     */
    data: jsonResponse
  //   onReady: () => {
  //     console.log('Editor.js is ready to work!')
  // }

  })
})

let saveBtn = document.querySelector('#save');
saveBtn.addEventListener('click', saveThis);

function saveThis() {
  editor.save().then((outputData) => {
    const urlP = `${currentURL}editor`;
    console.log('Article data: ', outputData);
    (async () => {
      try{
        const response = await fetch(urlP, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(outputData)
        })
        // if (response.ok) {
        //   // const jsonResponse = await response.json();
        //   console.log(response.body);
        // }
      }
      catch(error){console.log(error)}
    })();
  }).catch((error) => {
    console.log('Saving failed: ', error)
  });
}

// let testBtn = document.querySelector('#test');
// testBtn.addEventListener('click', test);
// function test() {
//   const xhr = new XMLHttpRequest();
//   const url = 'http://localhost:3001/users:blocks';
//   xhr.responseType = 'json';
//   xhr.onreadystatechange = () => {
//     if (xhr.readyState === XMLHttpRequest.DONE) {
//       doSome(xhr.response);
//     }	
//   };
//   xhr.open('GET', url);
//   xhr.send();
//   function doSome(data) {
//     console.log(data);
//   }
// }