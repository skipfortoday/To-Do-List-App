void main() {

  List<Map<String, dynamic>> storeData = [
    {'nama': 'ID1', 'harga': 20000 , 'bolehTcard' : true , 'qty' : 1 , 'disc1' : 30, 'disc2' : 50 },
    {'nama': 'ID2', 'harga': 10000 , 'bolehTcard' : false,  'qty' : 2 , 'disc1' : 0 , 'disc2' : 0},
    {'nama': 'ID3', 'harga': 5000 , 'bolehTcard' : true, 'qty' : 3 , 'disc1' : 0 , 'disc2' : 0},
    {'nama': 'ID4', 'harga': 75000 , 'bolehTcard' : true, 'qty' : 1 , 'disc1' : 50000 , 'disc2' : 0 },
    {'nama': 'ID5', 'harga': 15000 , 'bolehTcard' : false, 'qty' : 2 , 'disc1' : 0 , 'disc2' : 0},
  ];


    num jh = 0 ;
    String vPersen = '80%';


  if (vPersen.isNotEmpty && vPersen.contains('%')) {
    vPersen = vPersen.substring(0, vPersen.length - 1);
  }


  

  jh = int.parse(vPersen);
  print(jh);
  
  num rpBolehTcard = 0 ;
  num rpNonTcard = 0 ;
  num rpBeforeDisc = 0 ;
  num keyDisc1 = 0 ; 
  num keyDisc2 = 0 ;

  Map<String, num> detailHarga = {
    'rpBolehTcard': 0,
    'rpNonTcard': 0,
    'rpBeforeDisc' : 0,
    'rpDiscNota' : 0,
    'rpHargaFinal' : 0,
  };

  for (var storeData in storeData) {
      rpBeforeDisc += (storeData["harga"]! * storeData["qty"]!);

      if(storeData['bolehTcard']){
        rpBolehTcard += (
                        ((storeData["harga"]! * storeData["qty"]!) 

                        // Kalau key disc itu berupa 
                        // Kalau Ada spaci dihilangkan lalu di ubah ke 

                        - (storeData["disc1"] > 0 && storeData["disc1"] <= 100  ? ( storeData["harga"]! * (storeData["disc1"] / 100 )) : 0)
                        - (storeData["disc1"] > 100 ? (storeData["disc1"]) : 0))

                        - (storeData["disc2"] > 0 && storeData["disc2"] <= 100  ? ( storeData["harga"]! * (storeData["disc2"] / 100 )) : 0)
                        - (storeData["disc2"] > 100 ? (storeData["disc2"]) : 0)

                      );
      }

      if(!storeData['bolehTcard']){
        rpNonTcard += (

                        ((storeData["harga"]! * storeData["qty"]!) 

                        - (storeData["disc1"] > 0 && storeData["disc1"] <= 100  ? ( storeData["harga"]! * (storeData["disc1"] / 100 )) : 0)
                        - (storeData["disc1"] > 100 ? (storeData["disc1"]) : 0))

                        - (storeData["disc2"] > 0 && storeData["disc2"] <= 100  ? ( storeData["harga"]! * (storeData["disc2"] / 100 )) : 0)
                        - (storeData["disc2"] > 100 ? (storeData["disc2"]) : 0)

                    );
      }     
  }

  
  detailHarga['rpBolehTcard'] = rpBolehTcard; 
  detailHarga['rpNonTcard'] = rpNonTcard; 
  detailHarga['rpBeforeDisc'] = rpBeforeDisc;
  detailHarga['rpHargaFinal'] = (

                                (rpBolehTcard + rpNonTcard)  
                              - ( detailHarga['rpDiscNota']! > 0 && detailHarga['rpDiscNota']! <= 100 ?  ( rpBeforeDisc * (detailHarga['rpDiscNota']! / 100)) : 0)   
                              - ( detailHarga['rpDiscNota']! > 100 ?  detailHarga['rpDiscNota']! : 0)  
                              
 );

  print(detailHarga);
}
