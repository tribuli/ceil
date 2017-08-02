// 插入排序
// 时间复杂度O(n^2)
// 算法描述：
// 1. 从第一个元素开始，该元素可以认为已经被排序
// 2. 取出下一个元素，在已经排序的元素序列中从后向前扫描
// 3. 如果该元素（已排序）大于新元素，将该元素移到下一位置
// 4. 重复步骤 3，直到找到已排序的元素小于或者等于新元素的位置
// 5. 将新元素插入到该位置后
// 6. 重复步骤 2~5
// 编程思路：双层循环，外循环控制未排序的元素，内循环控制已排序的元素，将未排序元素设为标杆，与已排序的元素进行比较，小于则交换位置，大于则位置不动
function insertSort (arr) {
  var tmp;
  for (var i = 1, len = arr.length; i < len; i++) {
    tmp = arr[i];
    for ( var j = i; j >= 0; j--) {
      var t = j - 1;
      if (arr[t] > tmp) {
        arr[j] = arr[t];
      } else {
        arr[j] = tmp;
        break;
      }
    }
  }
  return arr
}

// 选择排序
// 时间复杂度O(n^2)
// 算法描述：直接从待排序数组中选择一个最小（或最大）数字，放入新数组中。
// 编程思路：先假设第一个元素为最小的，然后通过循环找出最小元素，然后同第一个元素交换，接着假设第二个元素，重复上述操作即可
function selectSort(array) {
  var length = array.length,
      i,
      j,
      minIndex,
      minValue,
      temp;
  for (i = 0; i < length - 1; i++) {
    minIndex = i;
    minValue = array[minIndex];
    for (j = i + 1; j < length; j++) {//通过循环选出最小的
      if (array[j] < minValue) {
        minIndex = j;
        minValue = array[minIndex];
      }
    }
    // 交换位置
    temp = array[i];
    array[i] = minValue;
    array[minIndex] = temp;
  }
  return array
}

// 归并排序
// 时间复杂度O(nlogn)
// 算法描述：
// 1. 把 n 个记录看成 n 个长度为 l 的有序子表
// 2. 进行两两归并使记录关键字有序，得到 n/2 个长度为 2 的有序子表
// 3. 重复第 2 步直到所有记录归并成一个长度为 n 的有序表为止。
// 编程思路：将数组一直等分，然后合并
function merge(left, right) {
  var tmp = [];

  while (left.length && right.length) {
    if (left[0] < right[0])
      tmp.push(left.shift());
    else
      tmp.push(right.shift());
  }

  return tmp.concat(left, right);
}

function mergeSort(a) {
  if (a.length === 1)
    return a;

  var mid = Math.floor(a.length / 2)
    , left = a.slice(0, mid)
    , right = a.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
}

// 快速排序
// 时间复杂度O(nlogn)
// 算法描述：

// 在数据集之中，选择一个元素作为”基准”（pivot）。
// 所有小于”基准”的元素，都移到”基准”的左边；所有大于”基准”的元素，都移到”基准”的右边。这个操作称为分区 (partition)操作，分区操作结束后，基准元素所处的位置就是最终排序后它的位置。
// 对”基准”左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。
function quickSort(arr){
    if(arr.length<=1) return arr;
    var partitionIndex=Math.floor(arr.length/2);
    var tmp=arr[partitionIndex];
    var left=[];
    var right=[];
    for(var i=0;i<arr.length;i++){
        if(arr[i]<tmp){
            left.push(arr[i])
        }else{
            right.push(arr[i])
        }
    }
    return quickSort(left).concat([tmp],quickSort(right))
}
// 上述版本会造成堆栈溢出，所以建议使用下面版本

// 原地分区版：主要区别在于先进行分区处理，将数组分为左小右大
function quickSort(arr){
    function swap(arr,right,left){
        var tmp = arr[right];
        arr[right]=arr[left];
        arr[left]=tmp;
    }
    function partition(arr,left,right){//分区操作，
        var pivotValue=arr[right]//最右面设为标准
        var storeIndex=left;
        for(var i=left;i<right;i++){
            if(arr[i]<=pivotValue){
                swap(arr,storeIndex,i);
                storeIndex++;
            }
        }
        swap(arr,right,storeIndex);
        return storeIndex//返回标杆元素的索引值
    }
    function sort(arr,left,right){
        if(left>right) return;
        var storeIndex=partition(arr,left,right);
        sort(arr,left,storeIndex-1);
        sort(arr,storeIndex+1,right);
    }
    sort(arr,0,arr.length-1);
    return arr;
}

// 冒泡排序
// 时间复杂度O(n^2)
// 算法描述：
// 1. 比较相邻的元素。如果第一个比第二个大，就交换他们两个。
// 2. 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。在这一点，最后的元素应该会是最大的数。
// 3. 针对所有的元素重复以上的步骤，除了最后一个。
// 4. 持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。
// 编程思路：外循环控制需要比较的元素，比如第一次排序后，最后一个元素就不需要比较了，内循环则负责两两元素比较，将元素放到正确位置上
function bubbleSort(arr){
    var len=arr.length;
    for(var i=len-1;i>0;i--){
        for(var j=0;j<i;j++){
            if(arr[j]>arr[j+1]){
                var tmp = arr[j];
                arr[j]=arr[j+1];
                arr[j+1]=tmp
            }
        }
    }
    return arr;
}
