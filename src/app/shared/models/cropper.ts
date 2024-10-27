import { imgFormat } from 'shared/enum/cropper';

export interface Cropper {
  croppedWidth: number;
  croppedHeight?: number;
  croppedFormat: imgFormat.png | imgFormat.jpeg;
  cropperMinWidth: number;
  cropperMaxWidth: number;
  cropperMinHeight?: number;
  cropperMaxHeight?: number;
  cropperAspectRatio: number;
  croppedQuality: number;
}
