package com.runoob.test;

public class Puppy{
//   public Puppy(String name){
//      //�������������һ��������name
//      System.out.println("С���������� : " + name ); 
//   }
//   public static void main(String []args){
//      // �������佫����һ��Puppy����
//      Puppy myPuppy = new Puppy( "tommy" );
//   }
	
	int puppyAge;
	   public Puppy(String name){
	      // �������������һ��������name
	      System.out.println("С���������� : " + name ); 
	   }
	 
	   public void setAge( int age ){
	       puppyAge = age;
	   }
	 
	   public int getAge( ){
	       System.out.println("С��������Ϊ : " + puppyAge ); 
	       return puppyAge;
	   }
	 
	   public static void main(String []args){
	      /* �������� */
	      Puppy myPuppy = new Puppy( "tommy" );
	      /* ͨ���������趨age */
	      myPuppy.setAge( 2 );
	      /* ������һ��������ȡage */
	      myPuppy.getAge( );
	      /*��Ҳ�����������������ʳ�Ա���� */
	      System.out.println("����ֵ : " + myPuppy.puppyAge ); 
	   }
}