import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    function primeNumber(num) {
      for (let divisor = 2; divisor < num; divisor++)
        if (num % divisor == 0) return false;
      return true;
    }

    const determinadoNumero = 10000;

    for (let i = 2; i < determinadoNumero; i++)
      if (primeNumber(i)) console.log(i);

    return 'Hello World!';
  }
}
