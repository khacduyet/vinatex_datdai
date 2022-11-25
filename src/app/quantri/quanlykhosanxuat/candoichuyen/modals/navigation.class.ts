import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

export class BaseModalNavigation{
        constructor(public activeModal: NgbActiveModal ){

        }
        public Previous(){
                this.activeModal.close({opt:'Previous'})
        }
        public Next(){
                this.activeModal.close({opt:'Next'})
        }
}