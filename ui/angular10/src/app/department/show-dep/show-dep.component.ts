import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit{

  constructor(private service:SharedService) {}

  
  DepartmentList:any=[];

  ModalTitle:string ;
  ActivatedAddEditDepComp:boolean=false;
  dep:any;

  DepartmentIdFilter:string="";
  DepartmentNameFilter:string="";
  DepartmentListNoFilter:any=[];

  ngOnInit():void{
    this.refreshDepList(); 
  }

  refreshDepList(){
    this.service.getDepList().subscribe(data=>{
      this.DepartmentList=data;
      this.DepartmentListNoFilter=data;
      console.log(data)
    });
  }

  addClick(){
    this.dep={
      DepartmentId:0,
      DepartmentName:""
    }
    this.ModalTitle="Add Department"
    this.ActivatedAddEditDepComp=true;
    this.refreshDepList();
    

  }

  editClick(item){
    this.dep=item;
    this.ModalTitle="Edit Department";
    this.ActivatedAddEditDepComp=true;
    this.refreshDepList();
  }

  deleteClick(item){
    if(confirm("Are You Sure?")){
      this.service.deleteDepartment(item.DepartmentId).subscribe(data=>{
        alert(data.toString());
        this.refreshDepList();
      })
    }

  }

  closeClick(){
    this.ActivatedAddEditDepComp=false;

  }

  FilterFn(){
    var DepartmentIdFilter = this.DepartmentIdFilter;
    var DepartmentNameFilter = this.DepartmentNameFilter;

    this.DepartmentListNoFilter = this.DepartmentListNoFilter.filter(function(el){
      return el.DepartmentId.toString().toLowerCase().includes(
        DepartmentIdFilter.toString().trim().toLowerCase()
      )&&
      el.DepartmentName.toString().toLowerCase().includes(
        DepartmentNameFilter.toString().toLowerCase().trim().toLowerCase()
      )
    });
  }

  sortRes(prop, asc){
    this.DepartmentList = this.DepartmentListNoFilter.sort(function(a,b){
      if(asc){
        return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);
      }else{
        return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
      }
    })
  }
  
}
