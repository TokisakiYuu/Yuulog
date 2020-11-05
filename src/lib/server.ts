import http2 from "http2";
import http from "http";
import Koa from "koa";

interface SSLOptions {
    key: string | undefined,
    cert: string | undefined
}

interface YuuLogWebConfig {
    domain?: string[],
    httpsPort: number,
    httpPort: number,
    ssl: SSLOptions | undefined
}

interface YuuLogServerDetail {
    app: Koa<Koa.DefaultState, Koa.DefaultContext>,
    port: number,
    isHttp2: boolean
}

// 创建http2的Koa实例
export async function createHTTP2ServerApp(port: number, ssl:SSLOptions): Promise<Koa> {
    return new Promise((resolve, reject) => {
        const app = new Koa();
        const server = http2.createSecureServer({
            key: ssl.key,
            cert: ssl.cert,
            allowHTTP1: true
        }, app.callback());
        server.listen(port, () => resolve(app));
    });
}

// 创建http的Koa实例
export async function createHTTPApp(port: number): Promise<Koa> {
    return new Promise((resolve, reject) => {
        const app = new Koa();
        const server = http.createServer(app.callback());
        server.listen(port, () => resolve(app));
    });
}

export async function createYuuLogServer(webConfig: YuuLogWebConfig): Promise<YuuLogServerDetail> {
    let {httpPort, httpsPort, ssl} = webConfig;
    let detail: any = {};
    let YuuLogApp: Koa<Koa.DefaultState, Koa.DefaultContext>;
    const httpApp   = await createHTTPApp(httpPort);
    if(ssl && ssl.key && ssl.cert) {
        YuuLogApp = await createHTTP2ServerApp(httpsPort, ssl);
        httpApp.use(ctx => ctx.redirect(`https://${ctx.host}${ctx.url}`));
        detail.port = httpsPort;
        detail.isHttp2 = true;
    } else {
        YuuLogApp = httpApp;
        detail.port = httpPort;
        detail.isHttp2 = false;
    }
    detail.app = YuuLogApp;
    return detail;
}