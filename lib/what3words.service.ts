import { Inject, Injectable } from '@nestjs/common';
import * as api from '@what3words/api';
import { WHAT_3_WORDS_OPTIONS } from './what3words.constants';
import { What3WordsOptions } from './what3words.interface';

@Injectable()
export class What3WordsService {
  constructor(@Inject(WHAT_3_WORDS_OPTIONS) options: What3WordsOptions) {
    api.setOptions({ key: options.key });
  }

  async convertToCoordinates(words: string, signal?: AbortSignal): Promise<api.LocationJsonResponse> {
    return api.convertToCoordinates(words, signal);
  }

  async convertToCoordinatesGeoJson(words: string, signal?: AbortSignal): Promise<api.LocationGeoJsonResponse> {
    return api.convertToCoordinatesGeoJson(words, signal);
  }

  async convertTo3wa(
    coordinates: api.Coordinates,
    language?: string,
    signal?: AbortSignal,
  ): Promise<api.LocationJsonResponse> {
    return await api.convertTo3wa(coordinates, language, signal);
  }

  async convertTo3waGeoJson(
    coordinates: api.Coordinates,
    language?: string,
    signal?: AbortSignal,
  ): Promise<api.LocationGeoJsonResponse> {
    return await api.convertTo3waGeoJson(coordinates, language, signal);
  }

  async availableLanguages(signal?: AbortSignal): Promise<api.AvailableLanguagesResponse> {
    return await api.availableLanguages(signal);
  }

  async gridSection(boundingBox: api.Bounds, signal?: AbortSignal): Promise<api.GridSectionJsonResponse> {
    return api.gridSection(boundingBox, signal);
  }

  async gridSectionGeoJson(bbox: api.Bounds, signal?: AbortSignal): Promise<api.GridSectionGeoJsonResponse> {
    return api.gridSectionGeoJson(bbox, signal);
  }

  async autosuggest(
    input: string,
    options?: api.AutosuggestOptions,
    signal?: AbortSignal,
  ): Promise<api.AutosuggestResponse> {
    return api.autosuggest(input, options, signal);
  }

  async autosuggestSelection(
    rawInput: string,
    selection: string,
    rank: number,
    options?: api.AutosuggestOptions,
    sourceApi?: 'text' | 'voice',
  ): Promise<null> {
    return api.autosuggestSelection(rawInput, selection, rank, options, sourceApi);
  }
}
