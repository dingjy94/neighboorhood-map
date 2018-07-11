const api = 'https://api.yelp.com/v3/businesses/';

const cors_api_url = 'https://cors-anywhere.herokuapp.com/';

export const get = (yelp) => 
  fetch(`${cors_api_url}${api}${yelp}`, {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer vJDF1oLOIaGoHZEEVyOFhp4UihDnllNRalmnpeiAqB8EqHWPs2sUIydcbvBsw5XroRbAzwsz0p0tCIuejrUYKwI6E-Lq4EPZGF-KuZ8Y3omBAwHv5LEYveF4RbpDW3Yx',
    }
    }).then(function(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    })
   .then(res => res.json())
   .catch(error => {alert("yelp api error!")})