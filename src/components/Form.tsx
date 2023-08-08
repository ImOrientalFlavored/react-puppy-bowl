import { FC, useState } from 'react';
import { z } from 'zod';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Container, Grid, Box, Typography, MenuItem, SelectChangeEvent, Divider} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import UploadIcon from '@mui/icons-material/Upload';
import FormInput from './FormInput';
import { UppyOptions } from '@uppy/core';

import Uppy, { UppyFile } from "@uppy/core";
import { Dashboard } from "@uppy/react";
import ImageEditor from "@uppy/image-editor";
import Compressor from "@uppy/compressor";

import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css'
import '@uppy/image-editor/dist/style.min.css'
import '@uppy/status-bar/dist/style.min.css';
import { addNewPlayer } from '../API';

const uppy = new Uppy({proudlyDisplayPoweredByUppy:false} as UppyOptions)
                .use(ImageEditor, {})
                .use(Compressor);

// 👇 SignUp Schema with Zod
const signupSchema = z.object({
  name: z.string().min(1, 'Name is required').max(70),
  breed: z.string().min(1, 'Breed is required').max(25),
  imageUrl:z.string().url(),
  age:z.literal(true,{
    errorMap: ()=>({message: "Player must be under the age or determined physically fit by a professional"}),
  }),
  vaccinated:z.literal(true,{
    errorMap: ()=>({message: "Vaccinations must be up to date to ensure safety of player and other contestants"}),
  }),
  term:z.literal(true,{
    errorMap: ()=>({message: "You must accept the terms and conditions"}),
  }),
});



// 👇 Infer the Schema to get TypeScript Type
type PlayerSignUp = z.infer<typeof signupSchema>;

const PlayerForm: FC = () => {

  const [player, setPlayer] = useState({
		id:0,
		name:'',
		breed:'',
		status:'',
		imageUrl:'',
		createdAt:'',
		updatedAt:'',
		teamId:420,
		cohortId:0
	});

  const onImageUpload = (file : UppyFile) => {
    const fr = new FileReader();
    console.log(file.data)
    const image = file.data;
  fr.onload = (e) => {
    const src = e.target!.result as string;
    setPlayer({...player, ['imageUrl']:src})
  };
  fr.readAsDataURL(image);
  }
  
    uppy
    .on('file-added', onImageUpload)
    .on('file-editor:complete', onImageUpload)
    .on('upload', (updatedFile)=>{ console.log(updatedFile)
    })
  ;

  const handleStateChange = (prop: string) => (event: React.ChangeEvent | SelectChangeEvent) => {
    const et = event.target as HTMLButtonElement;
		setPlayer({ ...player, [prop]: et.value });
    console.log(player);
	};

  // 👇 Object containing all the methods returned by useForm
  const methods = useForm<PlayerSignUp>({
    resolver: zodResolver(signupSchema),
  
  });

  // 👇 Form Handler
  const onSubmitHandler: SubmitHandler<PlayerSignUp> = (values: PlayerSignUp) => {
    console.log(JSON.stringify(values, null, 4));
  };

  const onSignupClick = async (e: React.MouseEvent) => {
    console.log("Submit");
    console.log(e);
    addNewPlayer(player);
  }

  // 👇 Returned JSX
  return (
    <Container
      maxWidth={false}
      sx={{ height: '100vh', backgroundColor: { xs: '#fff', md: '#f4f4f4' } }}
    >
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        sx={{ width: '100%', height: '100%' }}
      >
        <Grid
          item
          sx={{ maxWidth: '70rem', width: '100%', backgroundColor: '#fff' }}
        >
          <Grid
            container
            sx={{
              boxShadow: { sm: '0 0 5px #ddd' },
              py: '6rem',
              px: '1rem',
            }}
          >
            <FormProvider {...methods}>
              <Typography
                variant='h4'
                component='h1'
                sx={{
                  textAlign: 'center',
                  color:'black',
                  width: '100%',
                  mb: '1.5rem',
                  pb: { sm: '3rem' },
                }}
              >
                Puppy Bowl GPX Sign-ups
              </Typography>
              <Grid
                item
                container
                justifyContent='space-between'
                rowSpacing={5}
                sx={{
                  maxWidth: { sm: '45rem' },
                  marginInline: 'auto',
                }}
              >
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{ borderRight: { sm: '1px solid #ddd' } }}
                >
                  <Box
                    display='flex'
                    flexDirection='column'
                    component='form'
                    noValidate
                    autoComplete='off'
                    sx={{ paddingRight: { sm: '3rem' } }}
                    onSubmit={methods.handleSubmit(onSubmitHandler)}
                  >
                    <Typography
                      variant='h6'
                      component='h1'
                      sx={{ textAlign: 'center', color:'black', mb: '1.5rem' }}
                    >
                      New Applicant Form
                    </Typography>

                    <FormInput
                      label='Name'
                      type='text'
                      name='name'
                      value={player.name}
                      onChange={handleStateChange('name')}
                      focused
                      required
                    />

                    <FormInput
                      label='Breed'
                      type='text'
                      name='breed'
                      value={player.breed}
                      onChange={handleStateChange('breed')}
                      focused
                      required
                    />
                    <FormInput
                      label='Status'
                      type='text'
                      name='status'
                      value={player.status}
                      onChange={handleStateChange('status')}
                      focused
                      select
                    >
                      <MenuItem value={'field'}>Field</MenuItem>
                      <MenuItem value={'bench'}>Bench</MenuItem>
                    </FormInput>      

                    <Divider 
                      variant="middle" 
                      sx={{ 
                        mb: '1rem' 
                      }}
                    />
                    <Typography
                      variant='h6'
                      color={'black'}
                    > 
                      Show off your handsome poopy face:
                    </Typography>
                    <LoadingButton
                      variant="outlined"
                      component="label"
                      endIcon={<UploadIcon />}
                      sx={{ 
                        mb: '1.5rem' 
                      }}
                    >
                        Upload Image
                        <input
                          type="file"
                          hidden
                        />
                    </LoadingButton>
                    <Divider 
                      variant="middle"
                      sx={{ 
                        mb: '1rem' 
                      }}
                    />
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="age"
                          aria-describedby="age"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                          {...methods.register('age')}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="age"
                          className="font-light text-gray-500 dark:text-gray-300"
                        >
                          Under 7 years of age or has been examined by a Vet?
                        </label>
                      </div>
                    </div>
                    {methods.formState.errors.age && (<span className="text-red-800 block mt-2">{methods.formState.errors.age?.message}</span>)}
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="vaccinated"
                          aria-describedby="vaccinated"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                          {...methods.register('vaccinated')}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="vaccinated"
                          className="font-light text-gray-500 dark:text-gray-300"
                        >
                          Vaccinations are up to date?
                        </label>
                      </div>
                    </div>
                    {methods.formState.errors.vaccinated && (<span className="text-red-800 block mt-2">{methods.formState.errors.vaccinated?.message}</span>)}
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="terms"
                          aria-describedby="terms"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                          {...methods.register('term')}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="terms"
                          className="font-light text-gray-500 dark:text-gray-300"
                        >
                          I accept the{" "}
                          <a
                            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                            href="#"
                          >
                            Terms and Conditions
                          </a>
                        </label>
                      </div>
                    </div>
                    {methods.formState.errors.term && (<span className="text-red-800 text-sm block mt-1">{methods.formState.errors.term?.message}</span>)}

                    <LoadingButton
                      loading={false}
                      type='button'
                      variant='contained'
                      onClick={(e)=>onSignupClick(e)}
                      sx={{
                        py: '0.8rem',
                        mt: 2,
                        width: '80%',
                        marginInline: 'auto',
                      }}
                    >
                      Sign Up
                    </LoadingButton>

                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} sx={{}}>
                  
                <Dashboard 
                  uppy={uppy} 
                  id="Dashboard" 
                  plugins={['ImageEditor'] 
                  }/>
                </Grid>    
              </Grid>
            </FormProvider>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
export default PlayerForm;