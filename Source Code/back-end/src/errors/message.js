function getErrorMessage(code) {
    switch (code) {
      case 400:
        return 'Bad Request';
      case 401:
        return 'Unauthorized';
      case 403:
        return 'Forbidden';
      case 404:
        return 'Not Found';
      case 429:
        return 'Too Many Requests';
      case 1:
        return 'Email already exist';
      case 2:
        return 'File too large';
      default:
        return 'Internal Server Error';
    }
  }
  
  module.exports = getErrorMessage;
  