const loadScript = (url) => new Promise((resolve, reject) => {
  let ready = false;
  if (!document) {
    reject(new Error('Document was not defined'));
  }
  const tag = document.getElementsByTagName('script')[0];
  const script = document.createElement('script');

  script.type = 'text/javascript';
  script.src = url;
  script.defer = true;
  script.onreadystatechange = () => {
    if (!ready && (!this.readyState || this.readyState === 'complete')) {
      ready = true;
      resolve(script);
    }
  };
  script.onload = script.onreadystatechange;

  script.onerror = (msg) => {
    alert("Error loading Google map, check your Network");
    reject(new Error('Error loading script.'));
  };

  script.onabort = (msg) => {
    console.log(msg);
    reject(new Error('Script loading aboirted.'));
  };

  if (tag.parentNode != null) {
    tag.parentNode.insertBefore(script, tag);
  }
});


export default loadScript;