/**
 * Cortesia do glorioso Shifatul Islam (Sif)
 * <https://medium.com/@thunderroid/angular-date-ago-pipe-minutes-hours-days-months-years-ago-c4b5efae5fe5>
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateAgo',
})
export class DateAgoPipe implements PipeTransform {

  public transform(value: Date, ...args: unknown[]): string | Date {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      // less than 30 seconds ago will show as 'Just now'
      if (seconds < 29) {
        return 'agora';
      }
      const intervals = {
        ano: 31536000,
        dia: 86400,
        hora: 3600,
        minuto: 60,
        mês: 2592000,
        segundo: 1,
        semana: 604800,
      };
      let counter: any;
      for (const i in intervals) {
        counter = Math.floor(seconds / intervals[i]);
        if (counter > 0) {
          if (counter === 1) {
              return counter + ' ' + i + ' atrás'; // singular (1 day ago)
          } else {
            if (i === 'mês') { return counter + ' meses atrás'; } // plural (2 days ago)
            return counter + ' ' + i + 's atrás'; // plural (2 days ago)
          }
        }
      }
    }
    return value;
  }

}
