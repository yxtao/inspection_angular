import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { InspectionApiService } from 'src/app/inspection-api.service';

@Component({
  selector: 'app-show-inspection', // To be mounted in a html page as a html selector
  templateUrl: './show-inspection.component.html',
  styleUrls: ['./show-inspection.component.css']
})
export class ShowInspectionComponent implements OnInit {

  inspectionList$!: Observable<any[]>;
  inspectionTypesList$!: Observable<any[]>;
  inspectionTypesList:any=[];

  //Map to display data associate with foreign keys
  inspectionTypesMap: Map<number, string> = new Map();

  constructor(private service:InspectionApiService) { }

  ngOnInit(): void {
    this.inspectionList$ = this.service.getInspectionList();
    // Testing 
    this.inspectionList$.subscribe(data=> console.log(data));

    this.inspectionTypesList$ = this.service.getInspectionTypesList();
    this.refreshInspectionTypesMap();
  }

  // Variables (properties)
  modalTitle:string="";
  activeAddEditInspectionComponent:boolean = false;
  inspection:any;
  
  modalAdd(){
    this.inspection ={
      id:0,
      status:null,
      comments:null,
      inspectionTypeId:null
    }
    this.modalTitle = "Add Inspection";
    this.activeAddEditInspectionComponent = true;
    console.log("clicked add item")
  }

  modalEdit(item:any){
    this.inspection = item;
    this.modalTitle = "Edit Inspection";
    this.activeAddEditInspectionComponent = true;
    console.log("clicked edit item")
  }

  modalDelete(item:any){
    if(confirm(`Are you sure you want to delete inspection ${item.id}`)){
      this.service.deleteInspection(item.id).subscribe(res=>{
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if(closeModalBtn){
          closeModalBtn.click();
        }
  
        var showDeleteSuccess = document.getElementById('delete-success-alert');
        if(showDeleteSuccess){
          console.log("found delete alert")
          showDeleteSuccess.style.display = "block";
        }
  
        setTimeout(function(){
          if(showDeleteSuccess){
            showDeleteSuccess.style.display = "none"
          }
        }, 4000);
        this.inspectionList$ = this.service.getInspectionList();
      })
    }
  }

  modalClose(){
    this.activeAddEditInspectionComponent = false;
    this.inspectionList$ = this.service.getInspectionList();
    console.log("clicked close add" )
  }
  refreshInspectionTypesMap() {
    this.inspectionTypesList$.subscribe (data =>{
      this.inspectionTypesList = data;
      console.log(data)
      for(let i=0; i< data.length; i++){
        this.inspectionTypesMap.set(this.inspectionTypesList[i].id, this.inspectionTypesList[i].inspectionName); 
      }
    })
  }
}
