import {Injectable} from "@angular/core";

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

@Injectable({
  providedIn: 'root',
})
export class EnumService {

  getPreviousMonth(month: Month, year: Year): string | undefined {
    let output: string | undefined;
    switch (month) {
      case Month.Jan:
        switch (year) {
          case Year.y2022:
            output = 'December 2021';
            break;
          case Year.y2021:
            return output;
        }
        break;
      case Month.Feb:
        output = 'January '+ year;
        break;
      case Month.Mar:
        output = 'February '+ year;
        break;
      case Month.Apr:
        output = 'March '+ year;
        break;
      case Month.May:
        output = 'April '+ year;
        break;
      case Month.Jun:
        output = 'May '+ year;
        break;
      case Month.Jul:
        output = 'Jun '+ year;
        break;
      case Month.Aug:
        output = 'July '+ year;
        break;
      case Month.Sep:
        output = 'August '+ year;
        break;
      case Month.Oct:
        output = 'September '+ year;
        break;
      case Month.Nov:
        output = 'October '+ year;
        break;
      case Month.Dec:
        output = 'November '+ year;
        break;
    }
    return output;
  }

  getNextMonth(month: Month, year: Year): string | undefined {
    let output: string | undefined;
    switch (month) {
      case Month.Jan:
        output = 'February '+ year;
        break;
      case Month.Feb:
        output = 'March '+ year;
        break;
      case Month.Mar:
        output = 'April '+ year;
        break;
      case Month.Apr:
        output = 'May '+ year;
        break;
      case Month.May:
        output = 'Jun '+ year;
        break;
      case Month.Jun:
        output = 'July '+ year;
        break;
      case Month.Jul:
        output = 'August '+ year;
        break;
      case Month.Aug:
        output = 'September '+ year;
        break;
      case Month.Sep:
        if (year === Year.y2022)
          return undefined;
        output = 'October '+ year;
        break;
      case Month.Oct:
        output = 'November '+ year;
        break;
      case Month.Nov:
        output = 'December '+ year;
        break;
      case Month.Dec:
        switch (year) {
          case Year.y2022:
            return undefined;
          case Year.y2021:
            output = 'January 2022'
        }
        break;
    }
    return output;
  }

  enumToFileName(month: Month, year: Year): string {
    if (month === Month.Year)
      return 'assets/testData.csv';
    return 'assets/' + month.substring(0, 3).toLowerCase() + year + '.csv';
  }
}

