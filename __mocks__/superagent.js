/* let mockDelay;*/
let mockError;
let mockHeaders = {};
let mockResponses = [];
  /* status: () => 200,
   * ok: true,
   * get: jest.genMockFunction(),
   * toError: jest.genMockFunction(),
   * headers: {},
     };*/
let currentPath = '';

const Request = {
  post(path) {
    currentPath = path;
    return this;
  },
  get(path) {
    currentPath = path;
    return this;
  },
  send: jest.genMockFunction().mockReturnThis(),
  query: jest.genMockFunction().mockReturnThis(),
  field: jest.genMockFunction().mockReturnThis(),
  set: jest.genMockFunction().mockReturnThis(),
  accept: jest.genMockFunction().mockReturnThis(),
  timeout: jest.genMockFunction().mockReturnThis(),
  then: callback => new Promise((resolve, reject) => {
    if (mockError) reject(mockError);
    else resolve(callback(mockResponses[currentPath]));
  }),
  __setMockResponse:  (path, mockRes) => { // eslint-disable-line
    if (!mockRes.headers) mockRes.headers = mockHeaders;
    mockResponses[path] = mockRes;
  },
  __setMockError: (mockErr) => { // eslint-disable-line
    mockError = mockErr;
  },
  __setMockDefaultMockHeaders: (headers) => { // eslint-disable-line
    mockHeaders = headers;
  },
  __reset: () => { mockResponses = []; },
};


module.exports = Request;
