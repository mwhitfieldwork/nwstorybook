import { Component, OnInit } from '@angular/core';
import {IProducts } from '../products/products';
import { ProductsService } from '../products/products.service';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ConversionPipe } from '../_pipes/conversion.pipe'; /// to use the pipe as a Provider

interface File {
  name: string,
  size: any,
  type: string
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[ConversionPipe]// allows a pipe to be injected
})

export class DashboardComponent implements OnInit {
  dashboardData:IProducts[];
  private _unsubscribeAll: Subject<any>;
  sub:Subscription;
  sub2:Subscription;
  popularInterests: any[] = [];
  popularSkills:any[] = [];
  DogImgData:any [] = [];
  graphsPoints:any;
  dogImgs:any[] =["http://cdn.shibe.online/shibes/185eaaffda7868b08c36f33f9086bbd2b600003c.jpg","http://cdn.shibe.online/shibes/9fa71750a2e2c68cfb7b8ce10275544f95b2f1cc.jpg","http://cdn.shibe.online/shibes/c608636ae06a2a6123f76e4497fe7503593cd52a.jpg","http://cdn.shibe.online/shibes/6df66329dbec922a16b0241f8b8de756adee0da1.jpg","http://cdn.shibe.online/shibes/beac35e09023a47fcf9a95bf1582212facb2e010.jpg","http://cdn.shibe.online/shibes/244f7976a92786ebcd792468f7400e905604bd1d.jpg","http://cdn.shibe.online/shibes/34a3e52e25ec26388ba698bd5e159d8eefc46eaf.jpg","http://cdn.shibe.online/shibes/7d37d4fe44e984a7a5b68c4da8600832f56ea61d.jpg","http://cdn.shibe.online/shibes/a902deb6daa0e22504c68117ec6bae0b127f8fee.jpg","http://cdn.shibe.online/shibes/6fec386a1374a4594634250a397e9c27dd1b5d36.jpg","http://cdn.shibe.online/shibes/d832d232780d6b7384ef5b5b63024782ef330fbf.jpg","http://cdn.shibe.online/shibes/0a4fa1028dd51edb4495867d39b1e1954885761c.jpg","http://cdn.shibe.online/shibes/e5e314f0e5d5046007234480f5b24a0bce200451.jpg","http://cdn.shibe.online/shibes/65cd362648ad7990006772f2bc8a686c60d3304f.jpg","http://cdn.shibe.online/shibes/d0f9124857d2d42dd42b3fbd36c1fc2af16a2c4e.jpg","http://cdn.shibe.online/shibes/f25ff356db2feef59aed4a86dd375a4a587cdb3f.jpg","http://cdn.shibe.online/shibes/5327399d960e8f8b1eaa0719fbe122247e8491b4.jpg","http://cdn.shibe.online/shibes/ef877869b01c2632d855e96879ae228df56d63ea.jpg","http://cdn.shibe.online/shibes/dbdbad13347d4c35554592b049806a073da8c896.jpg","http://cdn.shibe.online/shibes/edcf54128bddd58bfce90b275a0f0049a079c263.jpg","http://cdn.shibe.online/shibes/23d7fc63bee8f0c2b2b0b20897913f8b1a8d1b28.jpg","http://cdn.shibe.online/shibes/e898ff7c570df6f01362b46bd4528c680b7941b0.jpg","http://cdn.shibe.online/shibes/a31850a7767b210ea08664daf2ce3b18e780b58f.jpg","http://cdn.shibe.online/shibes/cacfc7403f7d624f2907df69435636603b179225.jpg","http://cdn.shibe.online/shibes/7612dd2ce4e459e64497a211f67320a8b9ceed33.jpg"]
  doglist: any[] = [];

  maxcount:number = 100;
  mincount:number = 0;
  midcount:number = 50
  files: File[];
  mapped: File[];

  constructor(private _productsService :ProductsService,private conversionPipe:ConversionPipe 
    ) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
 
    this.files = [
      { name: 'logo.svg', size: 2120109, type: 'image/svg' },
      { name: 'banner.jpg', size: 18029, type: 'image/jpg' },
      { name: 'background.png', size: 1784562, type: 'image/png' }
    ];

    this.mapped = this.files.map(file => { //this is a way that can e used to map the data using the pipe as a provider
      return {
        name: file.name,
        type: file.type,
        size: this.conversionPipe.transform(file.size)
      };
    });

    this.sub =  this._productsService.getProducts()
    .subscribe(nwdata => {
       //this.dashboardData = nwdata;
        this.interestsHorizontalGraph();
        this.skillsVerticleGraph();
        //this.getNBAData();
    })

    // this.graphsPoints = [
    //   {x1:40,y1:10, x2:65, y2:10,  x:50, y:10},
    //   {x2:150,y2:400, x:350, y:80},
    //   {x2:200,y2:450, x:350, y:80}
    // ]
  }

  interestsHorizontalGraph(){
    const interestNames:string[] = [];
    const allInterests:string[] = [];
    const allInterestPercentages = [];

    this.dashboardData.forEach( interests => {
      interests.interests.forEach(interest => { 
        //get list of all interest names
        allInterests.push(interest);
        //get unique interests, push into array 
        if(interestNames.indexOf(interest) == -1){
          interestNames.push(interest)
        }
      });
    })
    
     

    // make list of percentages
    for(let i=0; i< 6 ; i++){
      let randomIndex = Math.floor(Math.random() * interestNames.length);
      //loop through each interest, count how many have instance names appear in the list
      let count:number = allInterests.filter(x => x === interestNames[randomIndex]).length;
      //get total unique interest names
      const totalNames = interestNames.length;
      //make percent of the unique interest out of total
      const interestPercent:number = ((count/totalNames)* 100);
      var interestPercentIndexObj = {
        index:randomIndex,
        percent:interestPercent
      }
      //add to percent lists
      allInterestPercentages.push(interestPercentIndexObj);
     }

     //get the value of the highest percent
     let interestPercentMax = Math.max.apply(Math, allInterestPercentages.map(x => x.percent));

     for(let i=0; i< 6 ; i++){
      let randomindex = allInterestPercentages[i].index;
      let count:number = allInterests.filter(x => x === interestNames[randomindex]).length;
      let groupedinterestPercent = ((allInterestPercentages[i].percent/interestPercentMax) * 100)
      
      let interestObj = {
        name: interestNames[randomindex],
        count: groupedinterestPercent.toFixed(1) 
      }
      this.popularInterests.push(interestObj)
    }
     
    console.log(this.popularInterests)
  }

  skillsVerticleGraph(){
    const skillsNames:string[] = [];
    const allSkills:string[] = [];
    const allSkillsPercentages = [];

    this.dashboardData.forEach( skills => {
      skills.skills.forEach(skills => { 
        //get list of all interest names
        allSkills.push(skills);
        //get unique interests, push into array 
        if(skillsNames.indexOf(skills) == -1){
          skillsNames.push(skills)
        }
      });
    })
    
     

    // make list of percentages
    for(let i=0; i< 5; i++){
      let randomIndex = Math.floor(Math.random() * skillsNames.length);
      //loop through each interest, count how many have instance names appear in the list
      let count:number = allSkills.filter(x => x === skillsNames[randomIndex]).length;
      //get total unique interest names
      const totalNames = skillsNames.length;
      //make percent of the unique interest out of total
      const interestPercent:number = ((count/totalNames)* 100);
      var interestPercentIndexObj = {
        index:randomIndex,
        percent:interestPercent
      }
      //add to percent lists
      allSkillsPercentages.push(interestPercentIndexObj);
     }

     //get the value of the highest percent
     let interestPercentMax = Math.max.apply(Math, allSkillsPercentages.map(x => x.percent));

     for(let i=0; i< 5 ; i++){
      let randomindex = allSkillsPercentages[i].index;
      let count:number = allSkills.filter(x => x === skillsNames[randomindex]).length;
      let groupedinterestPercent = ((allSkillsPercentages[i].percent/interestPercentMax) * 100)
      
      let interestObj = {
        name: skillsNames[randomindex],
        count: groupedinterestPercent.toFixed(1) 
      }
      this.popularSkills.push(interestObj)
    }
     
    console.log(this.popularSkills)
  }

  /*
  getNBAData(){
    this.sub2 =  this._productsService.getDogData()
    .subscribe(dogdata => {
     let i= 0;
     for(let d in dogdata.message){
       if(dogdata.message[d].length > 2){
          let doglistObj = {
            name:d,
            list:dogdata.message[d],
            img: this.dogImgs[i]
          }
          this.doglist.push(doglistObj);
          i++;
         }
       }
      //loop through object 
      //grap properties with elements
     //this.DogImgData = fillDogList;
     console.log(this.doglist)
    });
  }
  */

  
  ngOnDestroy(): void
  {
    this.sub.unsubscribe()
  }

  editSkills(){
    
  }

  
  // getGradientPath(){
  //   let arr = [52.5,95]
  //   let curves = "";
  //   for(let y=0; y<arr.length; y++) {
  //     curves +=  arr[y] + " " +  (y*10) + " ,";
  //   }
  //   console.log(curves)
  //   return "M 30 50  " + curves + "T 180 80 z";
  // }

  // getCurvedPath(){
  //   let basis =  "M 10 30 C " + this.graphsPoints[0].x1 + " " + this.graphsPoints[0].y1  + " , " +
  //                   this.graphsPoints[0].x2 + " " + this.graphsPoints[0].y2 + " , " +
  //                   this.graphsPoints[0].x  + " "  + this.graphsPoints[0].y + " , "

  //   let assembleCurve = "";

  //   for(let y=0; y<this.graphsPoints.length; y++) {
  //     let s = " S "
  //     if(y > 0) {
  //       assembleCurve += s + this.graphsPoints[y].x2 + " "  + this.graphsPoints[y].y2 + "," + 
  //       this.graphsPoints[y].x +  " " + this.graphsPoints[y].y;
  //     }
  //   }

  //     return basis + assembleCurve  +  " v 35 25, H 10 10 z"
  //   console.log(this.graphsPoints)
  //   //40 10, 65 10, 95 80 S 150 150, 180 80";
  //   //return "M 10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80";
  // }

}
