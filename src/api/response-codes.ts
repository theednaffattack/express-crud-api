export const httpStatusCodes = {
  100: { code: 100, description: "CONTINUE" },
  101: { code: 101, description: "SWITCHING_PROTOCOLS" },
  102: { code: 102, description: "PROCESSING" },
  103: { code: 103, description: "EARLYHINTS" },
  200: { code: 200, description: "OK" },
  201: { code: 201, description: "CREATED" },
  202: { code: 202, description: "ACCEPTED" },
  203: { code: 203, description: "NON_AUTHORITATIVE_INFORMATION" },
  204: { code: 204, description: "NO_CONTENT" },
  205: { code: 205, description: "RESET_CONTENT" },
  206: { code: 206, description: "PARTIAL_CONTENT" },
  300: { code: 300, description: "AMBIGUOUS" },
  301: { code: 301, description: "MOVED_PERMANENTLY" },
  302: { code: 302, description: "FOUND" },
  303: { code: 303, description: "SEE_OTHER" },
  304: { code: 304, description: "NOT_MODIFIED" },
  307: { code: 307, description: "TEMPORARY_REDIRECT" },
  308: { code: 308, description: "PERMANENT_REDIRECT" },
  400: { code: 400, description: "BAD_REQUEST" },
  401: { code: 401, description: "UNAUTHORIZED" },
  402: { code: 402, description: "PAYMENT_REQUIRED" },
  403: { code: 403, description: "FORBIDDEN" },
  404: { code: 404, description: "NOT_FOUND" },
  405: { code: 405, description: "METHOD_NOT_ALLOWED" },
  406: { code: 406, description: "NOT_ACCEPTABLE" },
  407: { code: 407, description: "PROXY_AUTHENTICATION_REQUIRED" },
  408: { code: 408, description: "REQUEST_TIMEOUT" },
  409: { code: 409, description: "CONFLICT" },
  410: { code: 410, description: "GONE" },
  411: { code: 411, description: "LENGTH_REQUIRED" },
  412: { code: 412, description: "PRECONDITION_FAILED" },
  413: { code: 413, description: "PAYLOAD_TOO_LARGE" },
  414: { code: 414, description: "URI_TOO_LONG" },
  415: { code: 415, description: "UNSUPPORTED_MEDIA_TYPE" },
  416: { code: 416, description: "REQUESTED_RANGE_NOT_SATISFIABLE" },
  417: { code: 417, description: "EXPECTATION_FAILED" },
  418: { code: 418, description: "I_AM_A_TEAPOT" },
  421: { code: 421, description: "MISDIRECTED" },
  422: { code: 422, description: "UNPROCESSABLE_ENTITY" },
  424: { code: 424, description: "FAILED_DEPENDENCY" },
  428: { code: 428, description: "PRECONDITION_REQUIRED" },
  429: { code: 429, description: "TOO_MANY_REQUESTS" },
  500: { code: 500, description: "INTERNAL_SERVER_ERROR" },
  501: { code: 501, description: "NOT_IMPLEMENTED" },
  502: { code: 502, description: "BAD_GATEWAY" },
  503: { code: 503, description: "SERVICE_UNAVAILABLE" },
  504: { code: 504, description: "GATEWAY_TIMEOUT" },
  505: { code: 505, description: "HTTP_VERSION_NOT_SUPPORTED" },
};

export enum HttpStatus {
  CONTINUE = 100,
  SWITCHING_PROTOCOLS = 101,
  PROCESSING = 102,
  EARLYHINTS = 103,
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NON_AUTHORITATIVE_INFORMATION = 203,
  NO_CONTENT = 204,
  RESET_CONTENT = 205,
  PARTIAL_CONTENT = 206,
  AMBIGUOUS = 300,
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  SEE_OTHER = 303,
  NOT_MODIFIED = 304,
  TEMPORARY_REDIRECT = 307,
  PERMANENT_REDIRECT = 308,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  PROXY_AUTHENTICATION_REQUIRED = 407,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  GONE = 410,
  LENGTH_REQUIRED = 411,
  PRECONDITION_FAILED = 412,
  PAYLOAD_TOO_LARGE = 413,
  URI_TOO_LONG = 414,
  UNSUPPORTED_MEDIA_TYPE = 415,
  REQUESTED_RANGE_NOT_SATISFIABLE = 416,
  EXPECTATION_FAILED = 417,
  I_AM_A_TEAPOT = 418,
  MISDIRECTED = 421,
  UNPROCESSABLE_ENTITY = 422,
  FAILED_DEPENDENCY = 424,
  PRECONDITION_REQUIRED = 428,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  HTTP_VERSION_NOT_SUPPORTED = 505,
}
