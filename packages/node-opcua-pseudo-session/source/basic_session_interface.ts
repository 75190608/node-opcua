/**
 * @module node-opcua-pseudo-session
 */
import { DataValue } from "node-opcua-data-value";
import {
    BrowseDescription,
    BrowseDescriptionOptions,
    BrowseRequest,
    BrowseResponse,
    BrowseResult
} from "node-opcua-service-browse";
import {
    ReadValueId,
    ReadValueIdOptions
} from "node-opcua-service-read";

export type BrowseDescriptionLike = string | BrowseDescriptionOptions | BrowseDescription;
export type ReadValueIdLike = ReadValueId | ReadValueIdOptions;

export type ResponseCallback<T> = (err: Error | null, result?: T) => void;

export interface IBasicSession {

    browse(nodeToBrowse: BrowseDescriptionLike, callback: ResponseCallback<BrowseResult>): void;
    browse(nodesToBrowse: BrowseDescriptionLike[], callback: ResponseCallback<BrowseResult[]>): void;
    browse(nodeToBrowse: BrowseDescriptionLike): Promise<BrowseResult>;
    browse(nodesToBrowse: BrowseDescriptionLike[]): Promise<BrowseResult[]>;

    /**
     *
     * @param continuationPoint
     * @param releaseContinuationPoints  a Boolean parameter with the following values:
     *      TRUE passed continuationPoints shall be reset to free resources in
     *      the Server. The continuation points are released and the results
     *      and diagnosticInfos arrays are empty.
     *      FALSE passed continuationPoints shall be used to get the next set of
     *      browse information.
     *      A Client shall always use the continuation point returned by a Browse or
     *      BrowseNext response to free the resources for the continuation point in the
     *      Server. If the Client does not want to get the next set of browse information,
     *      BrowseNext shall be called with this parameter set to TRUE.
     * @param callback
     */
    browseNext(
      continuationPoint: Buffer,
      releaseContinuationPoints: boolean,
      callback: ResponseCallback<BrowseResult>): void;

    browseNext(
      continuationPoints: Buffer[],
      releaseContinuationPoints: boolean,
      callback: ResponseCallback<BrowseResult[]>): void;

    browseNext(
      continuationPoint: Buffer,
      releaseContinuationPoints: boolean
    ): Promise<BrowseResult>;

    browseNext(
      continuationPoints: Buffer[],
      releaseContinuationPoints: boolean
    ): Promise<BrowseResult[]>;

    read(nodeToRead: ReadValueIdLike, callback: ResponseCallback<DataValue>): void;
    read(nodesToRead: ReadValueIdLike[], callback: ResponseCallback<DataValue[]>): void;
    read(nodeToRead: ReadValueIdLike): Promise<DataValue>;
    read(nodesToRead: ReadValueIdLike[]): Promise<DataValue[]>;

}
