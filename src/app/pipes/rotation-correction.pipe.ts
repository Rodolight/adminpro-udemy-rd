// import { Pipe, PipeTransform } from '@angular/core';
// import { SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
// import 'rxjs/add/observable/bindCallback';


// const rotation = {
//   1: 'rotate(0deg)',
//   3: 'rotate(180deg)',
//   6: 'rotate(90deg)',
//   8: 'rotate(270deg)'
// };

// const arrayBufferToBase64 = ( buffer ) => {
//   let binary = '';
//   const bytes = new Uint8Array( buffer );
//   const len = bytes.byteLength;
//   for (let i = 0; i < len; i++) {
//     binary += String.fromCharCode( bytes[ i ] );
//   }
//   return window.btoa( binary );
// };

// @Pipe({
//   name: 'rotationCorrection'
// })
// export class RotationCorrectionPipe implements PipeTransform {

//   constructor() {}

//   public transform(image: Blob): Observable<string> {
//     const orientation = Observable.bindCallback<string>(this.orientation);
//     return orientation(image);
//   }

//   // Exif orientation value to css transform mapping
//   // Does not include flipped orientations
//   orientation(file, callback) {
//     const fileReader = new FileReader();
//     // tslint:disable-next-line: only-arrow-functions
//     fileReader.onloadend = function() {
//       const base64img = 'data:' + file.type + ';base64,' + arrayBufferToBase64(fileReader.result)
//       const scanner = new DataView(fileReader.result);
//       let idx = 0;
//       let value = 1; // Non-rotated is the default
//       if (fileReader.result.length < 2 || scanner.getUint16(idx) !== 0xFFD8) {
//         // Not a JPEG
//         if (callback) {
//           callback(rotation[value]);
//         }
//         return;
//       }
//       idx += 2;
//       let maxBytes = scanner.byteLength;
//       while (idx < maxBytes - 2) {
//         const uint16 = scanner.getUint16(idx);
//         idx += 2;
//         switch (uint16) {
//           case 0xFFE1: // Start of EXIF
//             const exifLength = scanner.getUint16(idx);
//             maxBytes = exifLength - idx;
//             idx += 2;
//             break;
//           case 0x0112: // Orientation tag
//             // Read the value, its 6 bytes further out
//             // See page 102 at the following URL
//             // http://www.kodak.com/global/plugins/acrobat/en/service/digCam/exifStandard2.pdf
//             value = scanner.getUint16(idx + 6, false);
//             maxBytes = 0; // Stop scanning
//             break;
//         }
//       }
//       if (callback) {
//         callback(rotation[value]);
//       }
//     };

//     fileReader.readAsArrayBuffer(file);
//   }
// }
