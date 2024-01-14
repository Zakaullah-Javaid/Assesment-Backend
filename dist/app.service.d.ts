import { OnApplicationBootstrap } from '@nestjs/common';
export declare class AppService implements OnApplicationBootstrap {
    constructor();
    onApplicationBootstrap(): Promise<void>;
}
