import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { ContentService } from './content.service';

@Injectable({
  providedIn: 'root'
})
export class ContentGuard implements CanActivate {
  constructor(
    private contentService: ContentService,
    private router: Router,
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const path = next.url.map(segment => segment.path).join('/');
    const file = `${path}.md`;

    return this.contentService.loadContent(file)
      .then(() => true)
      .catch(() => {
        this.router.navigate(['/']);

        return false;
      });
  }
}
