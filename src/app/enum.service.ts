export enum Month {
  Year = 'All months',
  Jan = 'January',
  Feb = 'February',
  Mar = 'March',
  Apr = 'April',
  May = 'May',
  Jun = 'Jun',
  Jul = 'July',
  Aug = 'August',
  Sep = 'September',
  Oct = 'October',
  Nov = 'November',
  Dec = 'December'
}

export enum Year {
  y2022 = '2022',
  y2021 = '2021'
}

export class EnumService {
  enumToFileName(month: Month, year: Year): string {
    return 'assets/' + month.toString().substring(0,2).toLowerCase() + year.toString();
  }
}

