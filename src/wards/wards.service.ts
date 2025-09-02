import { Injectable } from '@nestjs/common';

@Injectable()
export class WardsService {
  findAll() {
    // --- THIS IS A PLACEHOLDER FOR D1 ---
    console.log('WardsService findAll method called.');

    // Return a mock array of wards
    return [
      {
        id: 1,
        code: 'KTM-01',
        name_en: 'Ward 1',
        name_np: 'वडा १',
      },
      {
        id: 10,
        code: 'KTM-10',
        name_en: 'Ward 10',
        name_np: 'वडा १०',
      },
      {
        id: 32,
        code: 'KTM-32',
        name_en: 'Ward 32',
        name_np: 'वडा ३२',
      },
    ];
  }
}