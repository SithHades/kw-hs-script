function loadScript(url, callback) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  if (script.readyState) {
    // IE
    script.onreadystatechange = function () {
      if (
        script.readyState === 'loaded' ||
        script.readyState === 'complete'
      ) {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    // Others
    script.onload = function () {
      callback();
    };
  }
  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
}

// Function to render related search terms
function renderRelatedSearchTerms(keyword) {
  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML =
    '.related-search-term {display: inline-block;margin: 5px;padding: 8px;background-color: #f0f0f0;border-radius: 5px;}';
  document.getElementsByTagName('head')[0].appendChild(style);
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML =
    '.related-search-term a {color: #333;text-decoration: none;font-weight: bold;}';
  document.getElementsByTagName('head')[0].appendChild(style);

  const relatedSearchTermsContainer = document.getElementById(
    'related-search-terms'
  );

  const supplierId = relatedSearchTermsContainer.getAttribute(
    'data-supplier-id'
  );
  // Make a GET request to the backend
  fetch(
    `https://getrelatedkeywords-5nrwkperqa-uc.a.run.app/?keyword=${encodeURIComponent(
      keyword
    )}&supplier=${encodeURIComponent(supplierId)}`
  )
    .then((response) => response.json())
    .then((data) => {
      // Clear any previous content
      relatedSearchTermsContainer.innerHTML = '';
      // Render each related search term as a link
      console.log(data);
      data.forEach((item) => {
        const termContainer = document.createElement('div');
        termContainer.classList.add('related-search-term');

        const link = document.createElement('a');
        link.href = item.link;
        link.textContent = item.term;

        termContainer.appendChild(link);
        relatedSearchTermsContainer.appendChild(termContainer);
        termContainer.addEventListener('click', function () {
          // Trigger click event on link
          link.click();
        });
      });
    })
    .catch((error) =>
      console.error('Error fetching related search terms:', error)
    );
}

// Usage: Call this function passing the keyword
// For example: renderRelatedSearchTerms("your search term");

document.addEventListener('DOMContentLoaded', function () {
  const relatedSearchTermsElement = document.getElementById(
    'related-search-terms'
  );
  if (relatedSearchTermsElement) {
    const keyword =
      relatedSearchTermsElement.getAttribute('data-keyword');
    renderRelatedSearchTerms(keyword);
  }
});

// Alternatively, developers can call renderRelatedSearchTerms(keyword) from their own scripts
