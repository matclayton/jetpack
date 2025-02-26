import { trackKindOptionProps } from '../../../lib/video-tracks/types';

export type VideoId = number;
export type VideoGUID = string;

export type TrackProps = {
	label: string;
	srcLang: string;
	kind: trackKindOptionProps;
	src: string;
};

export type VideoBlockColorAttributesProps = {
	seekbarPlayedColor?: string;
	seekbarLoadingColor?: string;
	seekbarColor?: string;
};

export type VideoBlockAttributes = VideoBlockColorAttributesProps & {
	id?: VideoId;
	guid?: VideoGUID;
	src?: string;

	title?: string;
	description?: string;

	poster?: string;
	videoRatio?: number;
	tracks?: Array< TrackProps >;

	// Playback types
	autoplay?: boolean;
	caption?: string;
	controls?: boolean;
	loop?: boolean;
	muted?: boolean;
	playsinline?: boolean;
	preload?: string;

	// Rendering types
	cacheHtml?: string;
	maxWidth?: string;

	useAverageColor?: boolean;

	// Privacy and Rating types
	privacySetting?: number;
	allowDownload?: boolean;
	displayEmbed?: boolean;
	rating?: string;

	isPrivate?: boolean;
};

export type VideoBlockSetAttributesProps = ( attributes: VideoBlockAttributes ) => void;

export type VideoControlProps = {
	/**
	 * Block Attributes object.
	 */
	attributes: VideoBlockAttributes;

	setAttributes: VideoBlockSetAttributesProps;

	isRequestingVideoData: boolean;

	clientId?: string;
};

export type VideoEditProps = VideoControlProps;

export type DetailsPanelProps = VideoControlProps & {
	filename: string;
	chapter: TrackProps;
	isAutoGeneratedChapter: boolean;
	updateError: object | null;
};
