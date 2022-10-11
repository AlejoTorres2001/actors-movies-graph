export declare class ApiLog {
    id: number;
    method: string;
    url: string;
    ip: string;
    hostName: string;
    statusCode: number;
    reqTransportLayerProtocol: string;
    reqBody: string;
    reqQuery: string;
    throughputTime: number;
    date: Date;
    exceptionMessage?: string;
    exceptionName?: string;
}
