import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { AccoutService } from 'src/app/_services/accout.service';

export const authGuard: CanActivateFn = (route, state) => {
  const accoutService = inject(AccoutService);
  const toastr = inject(ToastrService);

  return accoutService.currentUser$.pipe(
    map((user) => {
      if (user) {
        return true;
      } else {
        toastr.error('You shall not pass');
        return false;
      }
    })
  );
};
